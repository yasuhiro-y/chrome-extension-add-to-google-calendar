chrome.contextMenus.create({
  title: 'このページのドメイン名を whois で検索',
  onclick: function (info, tab) {
    var url = info.pageUrl
    var host = url.replace(/https?:\/\/([^\/]+).*/, '$1')
    var tree = host.split('.')
    var parts = tree.length

    var domain
    if (parts == 1) {
      alert('ドメイン名を取得できません。')
      return
    } else if (parts == 2) {
      domain = host
    } else if (tree[parts - 1].length >= 3) {
      domain = tree[parts - 2] + '.' + tree[parts - 1]
    } else if (tree[parts - 2].length == 2) {
      domain = tree[parts - 3] + '.' + tree[parts - 2] + '.' + tree[parts - 1]
    } else {
      domain = tree[parts - 2] + '.' + tree[parts - 1]
    }

    chrome.tabs.create({
      url: 'http://akagi.jp/whois/?#!/key=' + domain,
    })
  },
})
