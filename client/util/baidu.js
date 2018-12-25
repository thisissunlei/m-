let win = typeof window == "undefined" ? global : window
const Baidu = {

  pageView:function(pageUrl){
    pageUrl = pageUrl || win.location.href;
    _hmt.push(['_trackEvent', 'nav', 'click', 'literature'])
  },
  trackEvent:function(category, action, opt_label, opt_value){
    category = category || '';
    action = action || '';
    opt_label = opt_label || '';
    opt_value = opt_value || '';

    win._hmt && win._hmt.push(['_trackEvent', category, action, opt_label,opt_value])
  }

}

module.exports = Baidu;