import request from '@/utils/request';
import { baseUrl, seller } from '@/utils/settings';

// 获取商家审核后详细信息
export async function detailsStore(param) {
  return request(
    `${baseUrl}seller/backstage/v1/seller/findSellerDetailInfo`,
    { method: 'post', data: param.payload },
    param.type,
  );
}
