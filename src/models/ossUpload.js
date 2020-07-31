import { message } from 'antd';
import oss from 'ali-oss';
import { getOssToken, getOssIds, delOssByUrl, applyOssId } from '@/services/ossUpload';
// 用于上传文件到阿里oss

export default {
  namespace: 'ossUpload',

  state: {
    isDone: false,
    uploadImgId: null,
    uploadImgUrl: null,
    fileList: [],
  },

  effects: {
    // 删除照片
    *fetchDelOssByUrl(param, { call }) {
      // 删除oss
      const resp = yield call(delOssByUrl, param);
      if (!resp.success) {
        message.warning('删除失败');
      }
    },
    *fetchUploadOss(param, { call, put, select }) {
      // 单组件
      // console.log(param)
      // 获取ossToken
      const resp = yield call(getOssToken, param);
      // console.log("tokenoss=>",resp)
      if (resp.status === '200' && resp.StatusCode === '200') {
        const { AccessKeyId } = resp;
        const { AccessKeySecret } = resp;
        const { SecurityToken } = resp;
        const { callbackUrl } = resp;
        // 获取ossId
        const resp2 = yield call(getOssIds, param);
        // console.log("ossIdRs=>", resp2)
        if (resp2.success) {
          const client = new oss({
            region: 'oss-cn-beijing',
            accessKeyId: AccessKeyId,
            accessKeySecret: AccessKeySecret,
            stsToken: SecurityToken,
            bucket: 'mogu-oss',
            secure: true,
          });
          const { file, fileType, type } = param.oss;
          const { ids, groupId } = resp2.data;
          const str = file.name.split('.');
          const suff = str[str.length - 1];
          // console.log(str, ids, groupId, suff)
          const ossCallBackParam = {
            id: ids[0],
            url: `${ids[0]}.${suff}`,
            suffix: `.${suff}`,
            fileType,
            type,
            groupId,
          };
          const ossCallBackParam2 = {
            id: ids[0],
            url: `app-data/${ossCallBackParam.fileType}/${ossCallBackParam.type}/${ids[0]}.${suff}`,
            suffix: `.${suff}`,
            filetype: fileType.toString(),
            type: type.toString(),
            groupid: groupId,
          };

          const callback = {
            url: callbackUrl,
            contentType: 'application/json',
            customValue: ossCallBackParam2,
          };
          let body = [];
          for (const [i, key] of Object.keys(ossCallBackParam).entries()) {
            body.push(`"${key}":\${x:${key.toLowerCase()}}`);
          }
          body = body.join();
          callback.body = `{${body}}`;
          // const result = yield client.multipartUpload('app-data/'+ossCallBackParam.fileType+'/'+ossCallBackParam.type+'/'+ids[0] + '.' + suff, file, {
          //     callback: callback,
          //     mime: 'application/x-zip-compressed'
          // });
          const result = yield client.put(
            `app-data/${ossCallBackParam.fileType}/${ossCallBackParam.type}/${ids[0]}.${suff}`,
            file,
            {
              callback,
              mime: 'application/x-zip-compressed',
            },
          );
          // console.log('result',result)
          if (result.res.status === 200 && result.res.statusCode === 200) {
            if (param.setUploadUrl instanceof Function) {
              param.setUploadUrl(ids[0], result.res.requestUrls[0]);
            }
            const applyParam = {
              payload: {
                groupId: result.data.data.groupId,
              },
              type: 'ossUpload/fetchUploadOss',
            };
            // 验证一组id
            const applyOssIdData = yield call(applyOssId, applyParam);
          } else {
            console.log('上传oss失败');
            message.warning('上传失败');
          }
        } else {
          console.log('获取ossId获取失败');
          message.warning('上传失败');
        }
      } else {
        console.log('ossToken获取失败');
        message.warning('上传失败');
      }
    },
    *fetchUploadListOss(param, { call, put, select }) {
      // list
      // 获取ossToken
      const resp = yield call(getOssToken, param);
      // console.log("tokenoss=>",resp)
      if (resp.status === '200' && resp.StatusCode === '200') {
        console.log('resp', resp);
        const AccessKeyId = resp.AccessKeyId;
        const AccessKeySecret = resp.AccessKeySecret;
        const SecurityToken = resp.SecurityToken;
        const callbackUrl = resp.callbackUrl;
        //获取ossId
        const resp2 = yield call(getOssIds, param);
        //console.log("ossIdRs=>", resp2)
        if (resp2.success) {
          const { file, fileType, type } = param.oss;
          const { ids, groupId } = resp2.data;
          const str = file.name.split('.');
          const suff = str[str.length - 1];
          //console.log(str, ids, groupId, suff)
          //设置fileList上传状态
          yield put({
            type: 'addFileList',
            payload: {
              id: ids[0],
            },
          });

          const client = new oss({
            region: 'oss-cn-beijing',
            accessKeyId: AccessKeyId,
            accessKeySecret: AccessKeySecret,
            stsToken: SecurityToken,
            bucket: 'mogu-oss',
            secure: true,
          });
          const ossCallBackParam = {
            id: ids[0],
            url: ids[0] + '.' + suff,
            suffix: '.' + suff,
            fileType: fileType,
            type: type,
            groupId: groupId,
          };
          const ossCallBackParam2 = {
            id: ids[0],
            url:
              'app-data/' +
              ossCallBackParam.fileType +
              '/' +
              ossCallBackParam.type +
              '/' +
              ids[0] +
              '.' +
              suff,
            suffix: '.' + suff,
            filetype: fileType.toString(),
            type: type.toString(),
            groupid: groupId,
          };

          let callback = {
            url: callbackUrl,
            contentType: 'application/json',
            customValue: ossCallBackParam2,
          };
          let body = [];
          for (let [i, key] of Object.keys(ossCallBackParam).entries()) {
            body.push('"' + key + '":${x:' + key.toLowerCase() + '}');
          }
          body = body.join();
          console.log('1234431', callback, file);
          callback.body = `{${body}}`;
          const result = yield client.multipartUpload(
            'app-data/' +
              ossCallBackParam.fileType +
              '/' +
              ossCallBackParam.type +
              '/' +
              ids[0] +
              '.' +
              suff,
            file,
            {
              callback: callback,
            },
          );
          console.log(result);
          if (result.res.status === 200 && result.res.statusCode === 200) {
            yield put({
              type: 'setFileListState',
              payload: {
                uid: ids[0],
                status: 'done',
                requestUrls: result.res.requestUrls[0],
                callBack: param.callBack,
              },
            });
            console.log('result.data.data.groupId', result.data.data.groupId);
            const applyParam = {
              payload: {
                groupId: result.data.data.groupId,
              },
              type: 'ossUpload/fetchUploadOss',
            };
            // 验证一组id
            const applyOssIdData = yield call(applyOssId, applyParam);
            console.log('applyOssIdData', applyOssIdData);
          } else {
            console.log('上传oss失败');
            message.warning('上传失败');
            yield put({
              type: 'setFileListState',
              payload: {
                uid: ids[0],
                status: 'error',
              },
            });
          }
        } else {
          console.log('获取ossId获取失败');
          message.warning('上传失败');
        }
      } else {
        console.log('ossToken获取失败');
        message.warning('上传失败');
      }
    },
    // *removeOssFileList(param, { call, put, select }) {
    //      //获取ossToken
    //      const data = yield call(ossFileListRemove, param);
    //      console.log("tokenoss=>",data)
    //      if (data.status === "200" && data.StatusCode === "200") {

    //      }else{

    //      }
    // },
  },

  reducers: {
    initFileList(state, { payload }) {
      return {
        ...state,
        fileList: payload,
      };
    },
    addFileList(state, { payload }) {
      let list = state.fileList.filter(item => {
        return item;
      });
      list.push({
        uid: payload.id,
        name: payload.id + '.png',
        status: 'uploading',
        url: payload.requestUrls,
      });
      return {
        ...state,
        fileList: list,
      };
    },
    removeFileList(state, { payload }) {
      console.log('state.fileList', state.fileList);
      let node = null;
      let list = state.fileList.filter(item => {
        console.log('删除循环=》', item, payload);
        if (item.uid !== payload.uid) {
          console.log('返回');
          return item;
        } else {
          node = item;
        }
      });
      payload.callBack(list, {
        uploadImgId: node.uid,
        uploadImgUrl: node.url,
      });
      return {
        ...state,
        fileList: list,
      };
    },
    setFileListState(state, { payload }) {
      let list = state.fileList.filter(item => {
        if (item.uid === payload.uid) {
          item.status = payload.status;
          item.url = payload.requestUrls;
        }
        return item;
      });
      payload.callBack(list);
      return {
        ...state,
        fileList: list,
      };
    },
  },
};
