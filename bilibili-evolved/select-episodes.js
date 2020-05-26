// ==UserScript==
// @name        BiliBili选集
// @description Bilibili Evolved插件批量下载页面添加选集功能
// @author      Taugge
// @license     MIT
// @match       *://*.bilibili.com/*
// @exclude     *://api.bilibili.com/*
// @exclude     *://api.*.bilibili.com/*
// @exclude     *://*.bilibili.com/api/*
// @exclude     *://member.bilibili.com/studio/bs-editor/*
// @run-at      document-start
// @updateURL   https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@master/bilibili-evolved.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@master/bilibili-evolved.user.js
// @grant       none
// @version     1.0
// @require     https://cdn.jsdelivr.net/npm/jquery@3.4.0/dist/jquery.min.js
// ==/UserScript==

const $document = $(document)

$document.ready(() => {
  let initHandler = function(e) {
    if (e.target.className === 'tab active download-batch') {
      $document.unbind('click', initHandler);
      
      let $end = $('<input id="episode-end" type="text" style="background: 0 0; color: var(--download-video-foreground); border: 1px solid #8884; border-radius: var(--corner-radius); padding: 4px; width: 30px;">')
      $document.find('div.episode-header h2').after($end)
      $document.find('div.episode-header h2').after('-')
      let $start = $('<input id="episode-start" type="text" style="background: 0 0; color: var(--download-video-foreground); border: 1px solid #8884; border-radius: var(--corner-radius); padding: 4px; width: 30px;">')
      $document.find('div.episode-header h2').after($start)
      
      let maxVal = $('div.episode-list').children().length
      $start.val('1')
      $end.val(maxVal)
      
      let checkStart = () => {
        let start = parseInt($start.val())
        if (start <= 0) {
          $start.val(1)
        } else if (start > maxVal) {
          $start.val(maxVal)
          $end.val(maxVal)
        } else {
          let end = parseInt($end.val())
          if (start > end) {
            $end.val(start)
          }
        }
      }
      $start.bind('input', checkStart)
      
      let checkEnd = () => {
        let end = parseInt($end.val())
        if (end > maxVal) {
          $end.val(maxVal)
        }
      }
      $end.bind('input', checkEnd)
      
      let selectEpisodes = (e) => {
        if (e.key==='Enter') {
          let s = parseInt($start.val()) - 1
          let e = parseInt($end.val()) - 1
          if (e < s) {
            $end.val(s+1)
            return
          }
          $('div.episode-list').children().each((i, item) => {
            if (i >= s && i <= e) {
              $(item).click()
            }
          })
        }
      }

      $start.keydown(selectEpisodes)
      $end.keydown(selectEpisodes)
    }
  };
  $document.bind('click', initHandler);
})
