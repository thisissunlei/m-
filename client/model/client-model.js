import axios from "axios";
// import Qs from "qs";
import Es6Promise from "es6-promise";
require("es6-promise").polyfill();
Es6Promise.polyfill();

// console.log(process.env.VUE_ENV, process.env.NODE_ENV, '11111111111------=========')
//http://optest02.krspace.cn
let url = "";
if (process.env.NODE_ENV === "development") {
  url = "http://optest02.krspace.cn/";
} else {
  url = "https://i.krspace.cn/";
}
let request = axios.create({
  baseURL: url
});

let handleRequest = function(request) {
  return new Promise((resolve, reject) => {
    request
      .then(resp => {
        let data = resp.data;
        if (data.code === 1) {
          resolve(data.data);
        } else {
          let message = data;
          reject(message);
          // console.log('1---------------', data, '---------------1')
        }
      })
      .catch(err => {
        let message = err.response.data;
        reject(message);
      });
  });
};
// 添加接口API
export default {
  getHeaderCommunityByip(data) {
    // ip定位
    // console.log("ip",data);
    return handleRequest(
      request.get("api/gateway/portalthree/get-community-byip", {
        params: data
      })
    );
  },
  getHeaderCityDownList(data) {
    //首页城市下拉列表
    return handleRequest(
      request.get("api/gateway/portalthree/city/down-list", { params: data })
    );
  },
  getFocusBanner(data) {
    // 首页banner
    return handleRequest(
      request.get("api/gateway/portalthree/focus-baner", { params: data })
    );
  },
  getIndexHotCommunity(data) {
    // 首页热门社区列表
    return handleRequest(
      request.get("api/gateway/portalthree/popular-community", { params: data })
    );
  },
  getIndexWaitCommunity(data) {
    // 首页待开社区列表
    return handleRequest(
      request.get("api/gateway/portalthree/community-will-open", {
        params: data
      })
    );
  },
  getIndexOfficeEnv(data) {
    // 首页办公环境列表
    return handleRequest(
      request.get("api/gateway/portalthree/office-env", { params: data })
    );
  },
  getIndexActivityList(data) {
    // 首页社区活动列表
    return handleRequest(
      request.get("api/gateway/portalthree/activity-list", { params: data })
    );
  },
  getNewsList(data) {
    //about页面新闻列表
    return handleRequest(
      request.get("api/gateway/portalthree/news-list", { params: data })
    );
  },
  getNewsDetail(data) {
    //about页面新闻详情
    return handleRequest(
      request.get("api/gateway/portalthree/news-detail", { params: data })
    );
  },
  getWelfareList(data) {
    // 福利列表
    return handleRequest(
      request.get("api/gateway/portalthree/get-benefits-page", { params: data })
    );
  },
  getPorCouponTags(data) {
    // 福利标签
    return handleRequest(
      request.get("api/gateway/portalthree/por-coupon-tags", { params: data })
    );
  },
  getBenefitsDetail(data) {
    // 福利详情
    return handleRequest(
      request.get("api/gateway/portalthree/benefits-detail", { params: data })
    );
  },
  getCmtCityList(data) {
    //城市社区列表
    return handleRequest(
      request.get("api/gateway/portalthree/cmt-city/down-list", {
        params: data
      })
    );
  },
  getRecommendActivity(data) {
    //推荐活动列表
    return handleRequest(
      request.get("api/gateway/portalthree/activity-cmt-other", {
        params: data
      })
    );
  },
  getActivityList(data) {
    //活动列表
    return handleRequest(
      request.get("api/gateway/portalthree/activity-list", { params: data })
    );
  },
  getActivityDetail(data) {
    //活动列表详情
    return handleRequest(
      request.get("api/gateway/portalthree/activity-detail", { params: data })
    );
  }
};
