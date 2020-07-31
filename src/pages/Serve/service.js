import request from '@/utils/request';
import { baseUrl } from '@/utils/settings';

// 获取类别管理列表
export async function ServeListGet(param) {
    return request(`${baseUrl}category/backstage/v1/categoryType/findCategoryTypeList`, { method: 'post', data: param.payload }, param.type);
}

// 添加一个类别（类别管理）
export async function submitServe(param) {
    return request(`${baseUrl}category/backstage/v1/categoryType/addCategoryType`, { method: 'post', data: param.payload }, param.type);
}
// 删除一个类别（类别管理）
export async function serveDelete(param) {
    return request(`${baseUrl}category/backstage/v1/categoryType/delCategoryTypeById`, { method: 'post', data: param.payload }, param.type);
}
// 获取一个类别的详细信息，回填（类别管理）
export async function infoGetServe(param) {
    return request(`${baseUrl}category/backstage/v1/categoryType/findCategoryTypeById`, { method: 'post', data: param.payload }, param.type);
}
// 修改一个类别（类别管理）
export async function submitServeEdit(param) {
    return request(`${baseUrl}category/backstage/v1/categoryType/updateCategoryType`, { method: 'post', data: param.payload }, param.type);
}

// 获取一组二级类，之前的接口
// export async function listGetServeCate(param) {
//     return request(baseUrl + 'category/backstage/v1/category/findCategoryAll', { method: 'post', data: param.payload }, param.type);
// }
// 获取一组二级类，现在的
export async function listGetServeCate(param) {
    return request(`${baseUrl}category/backstage/v1/category/findCategoryByCode`, { method: 'post', data: param.payload }, param.type);
}

// 添加一个二级分类
export async function submitServeCate(param) {
    return request(`${baseUrl}category/backstage/v1/category/addCategory`, { method: 'post', data: param.payload }, param.type);
}
// 删除一个二级分类
export async function ServeCateDelete(param) {
    return request(`${baseUrl}category/backstage/v1/category/deleteCategoryById`, { method: 'post', data: param.payload }, param.type);
}
// 获取一个二级类详情
export async function infoGetserveCate(param) {
    return request(`${baseUrl}category/backstage/v1/category/findCategoryById`, { method: 'post', data: param.payload }, param.type);
}
// 编辑一个二级类
export async function editServeCate(param) {
    return request(`${baseUrl}category/backstage/v1/category/updateCategory`, { method: 'post', data: param.payload }, param.type);
}