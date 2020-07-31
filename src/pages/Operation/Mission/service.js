import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

// 任务
// 后台获取任务列表--assignment-service--任务模块
export async function findBackAssignmentMainList(param) {
  return request(
    `${baseUrl}assignment/back/v1/assignment/findBackAssignmentMainList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 根据主任务id查询对应的主任务和子任务
export async function findAssignmentMainAndActionMappingByMainId(param) {
  return request(
    `${baseUrl}assignment/back/v1/assignment/findAssignmentMainAndActionMappingByMainId`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 添加任务--assignment-service--任务模块(新增任务模板)
export async function addAssignmentMain(param) {
  return request(
    `${baseUrl}assignment/back/v1/assignment/addAssignmentMain`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 修改主任务模板--assignment-service--任务模块
export async function updateAssignmentMain(param) {
  return request(
    `${baseUrl}assignment/back/v1/assignment/updateAssignmentMain`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 修改子任务模板--assignment-service--任务模块
export async function updateAssignmentMainActionMapping(param) {
  return request(
    `${baseUrl}assignment/back/v1/assignment/updateAssignmentMainActionMapping`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 查询礼品列表--assignment-service--任务模块
export async function findAssignmentGiftServerList(param) {
  return request(
    `${baseUrl}assignment/back/v1/assignment/findAssignmentGiftServerList`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
// 查询行为列表
export async function findAssignmentActionListForBack(param) {
  return request(
    `${baseUrl}assignment/back/v1/assignment/findAssignmentActionListForBack`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
