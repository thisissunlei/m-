import axios from "axios";
import Qs from "qs";
import Es6Promise from "es6-promise";
require("es6-promise").polyfill();
Es6Promise.polyfill();

// console.log(process.env.VUE_ENV, process.env.NODE_ENV, '11111111111------=========')
//http://optest02.krspace.cn
let url = "";
if (process.env.NODE_ENV === "development") {
  url = "http://optest01.krspace.cn/";
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
      request.get("api/gateway/portalthree/city/down-list", {
        params: data
      })
    );
  },
  /**
   * 提交预约信息
   * @param {username} 用户昵称 不用必填 即空则客户
   *  @param {mobilephone} 用户电话 必填
   *  @param {appionttime} 用户日期 页面不写 默认当前时间+1
   *  @param {communityId} 社区id 页面不写 默认
   */
  getVisitInfo(data) {
    return handleRequest(
      request.post("api/gateway/portals/save-visit-info", {
        params: data
      })
    );
  },

  getFocusBanner(data) {
    // 首页banner
    return handleRequest(
      request.get("api/gateway/portalthree/focus-baner", {
        params: data
      })
    );
  },
  getIndexHotCommunity(data) {
    // 首页热门社区列表
    return handleRequest(
      request.get("api/gateway/portalthree/popular-community", {
        params: data
      })
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
      request.get("api/gateway/portalthree/office-env", {
        params: data
      })
    );
  },
  getIndexMember(data) {
    // 首页会员报道列表
    return handleRequest(
      request.get("api/gateway/portalthree/usernews-list", {
        params: data
      })
    );
  },

  getNewsList(data) {
    //about页面新闻列表
    return handleRequest(
      request.get("api/gateway/portalthree/news-list", {
        params: data
      })
    );
  },
  getNewsDetail(data) {
    //about页面新闻详情
    return handleRequest(
      request.get("api/gateway/portalthree/news-detail", {
        params: data
      })
    );
  },
  getWelfareList(data) {
    // 福利列表
    return handleRequest(
      request.get("api/gateway/portalthree/get-benefits-page", {
        params: data
      })
    );
  },
  getPorCouponTags(data) {
    // 福利标签
    return handleRequest(
      request.get("api/gateway/portalthree/por-coupon-tags", {
        params: data
      })
    );
  },
  getBenefitsDetail(data) {
    // 福利详情
    return handleRequest(
      request.get("api/gateway/portalthree/benefits-detail", {
        params: data
      })
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
      request.get("api/gateway/portalthree/recommend-activity", {
        params: data
      })
    );
  },
  getActivityList(data) {
    //活动列表
    return handleRequest(
      request.get("api/gateway/portalthree/activity-list", {
        params: data
      })
    );
  },
  getActivityDetail(data) {
    //活动列表详情
    return handleRequest(
      request.get("api/gateway/portalthree/activity-detail", {
        params: data
      })
    );
  },
  getMemberList(data) {
    //会员列表
    return handleRequest(
      request.get("api/gateway/portalthree/usernews-list", {
        params: data
      })
    );
  },
  memberReadCount(data) {
    //阅读量
    return handleRequest(
      request.post("api/gateway/portalthree/add-news-read", {
        params: data
      })
    );
  },
  getCometTeamList(data) {
    // 团队 list
    return handleRequest(
      request.get("api/gateway/portalthree/comet-team-list", {
        params: data
      })
    );
  },
  getPorNewsDetails(data) {
    // 会员报道 details
    return handleRequest(
      request.get("api/gateway/portalthree/por-news-details", {
        params: data
      })
    );
  },
  getTeamDetail(data) {
    //团队详情
    return handleRequest(
      request.get("api/gateway/portalthree/teamdetail", {
        params: data
      })
    );
  },
  getCommunityCbds(data) {
    // 社区筛选条件
    return handleRequest(
      request.get("api/gateway/portalthree/cmt-cbd", {
        params: data
      })
    );
  },
  getCommunityStatus(data) {
    // 社区筛选状态
    return handleRequest(
      request.get("api/gateway/portalthree/status/seat-price", {
        params: data
      })
    );
  },
  getCommunityList(data) {
    // 社区列表
    return handleRequest(
      request.get("api/gateway/portalthree/cmt-listing", {
        params: data
      })
    );
  },
  getCommunityDetails(data) {
    //社区详情
    return handleRequest(
      request.get("api/gateway/portalthree/community-detail", {
        params: data
      })
    );
  },
  getOfficeType(data) {
    //高效、分时办公
    return handleRequest(
      request.get("api/gateway/portalthree/office-type", {
        params: data
      })
    );
  },
  getSameCommunity(data) {
    //同城社区
    return handleRequest(
      request.get("api/gateway/portalthree/same-cmt", {
        params: data
      })
    );
  },
  getComter(data) {
    //高效、分时办公
    return handleRequest(
      request.get("api/gateway/get-all-cbd", {
        params: data
      })
    );
  },
  setNewsRead(data) {
    // 增加阅读人数
    return handleRequest(
      request.post('api/gateway/portalthree/add-news-read',
       Qs.stringify(data)))
  },

  // 推广页面接口 start
  //获取定位社区
  getVisitCommunity(data) {
    return handleRequest(
      request.get('/api/gateway/get-community-byip')
    );
  },
  // 获取全部城市
  getCityList(data) {
    return handleRequest(
      request.get('/api/gateway/protals-all-city')
    );
  },
  //market推广预约
  postCityVisit(data) {
    return handleRequest(
      request.post('/api/gateway/portals/save-city-visit',
        Qs.stringify(data)
      )
    );
  },
  // 推广页面接口 end
};
