import model from 'model'

export default {
  state: {

    communityData:[],

  },
  actions: {
    getComter({commit} , data) {
      return model.getComter(data)
        .then( res => {

          //计算商圈接口
          var communityData = Object.assign({}, res);
          console.log('communityData',res)
          communityData = communityData.items.map((item, index) => {
            //更改城市字段
            item.name = item.cityName;
            item.id = index;
            var children = [];
            item.protalsCbdVos.forEach((items,itemIndex) => {
              if(items.dayPrice){
                items.name = items.cbdName;
                items.id = itemIndex;
                children.push(items);
              }
            });
            item.children = children;
            return item;
          });
          commit('setComter', communityData)
        })
        .catch( err => {
          console.log(err);
        })
    },
  },
  mutations: {
    setComter(state, data) {
      state.communityData = data
    },
  },
  getters: {

  }
}
