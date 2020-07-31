// 域名端口
export const baseUrl = 'http://192.168.2.244:19201/';
// export const baseUrl = 'https://api.mqkj.net.cn/serve/'
// 入驻申请流程接口
export const seller = 'seller/';
// 获取code地址
export const getCodeUrl = `${baseUrl}test/getCode`;
// 刷新token地址
export const refreshTokenUrl = `${baseUrl}business/backstage/v1/user/refreshToken`;
// 请求的header中没有token的url数组
export const noHeaderUrl = [getCodeUrl, refreshTokenUrl];
