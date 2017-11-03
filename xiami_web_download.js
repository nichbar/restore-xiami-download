// ==UserScript==
// @name         xiami_web_download
// @namespace    https	://nich.work
// @version      0.1
// @description  For those who would like to download music from web rather than desktop client.
// @author       You
// @match        http://www.xiami.com
// @match        http://www.xiami.com/*
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    unsafeWindow.xm_download = function(id, type, ele) {
        if (type && type == 'song') {
            var pare = ele.parentNode.parentNode.parentNode;
            if (pare) {
                var data = pare.getAttribute('data-json');
                data = JSON.parse(decodeURIComponent(data));
                data.id = id;
                selectDownlodQuality(data);
                return;
            }
        } else {
            var url = 'http://www.xiami.com/download/pay?id=' + encodeURIComponent(id);
            window.open(url);
        }
    };


    unsafeWindow.selectDownlodQuality = function(data) {
        var ht, warm, lowht, highht;
        if (data.LOW == 'FREE') {
            lowht = '<li style="cursor:pointer" onclick="prepareZipx(\'song\', ' + data.id + ', 1)" class="item"><span style="color:#f60;margin-right:5px;">⬇</span>流畅品质</li>';
        } else if (data.LOW == 'NEED_PAY') {
            lowht = '<li style="cursor:pointer" onclick="buyMusic(\'song\', ' + data.id + ', \'下载\');" class="item"><span style="color:#f60;margin-right:5px;">⬇</span><b class="identities ident-small">付费</b>流畅品质</li>';
        } else {
            lowht = '';
        }

        if (data.HIGH == 'FREE') {
            highht = '<li style="cursor:pointer" onclick="prepareZipx(\'song\', ' + data.id + ', 2)" class="item"><span style="color:#f60;margin-right:5px;">⬇</span>高品质</li>';
        } else if (data.HIGH == 'NEED_PAY') {
            highht = '<li style="cursor:pointer" onclick="buyMusic(\'song\', ' + data.id + ', \'下载\');" class="item"><span style="color:#f60;margin-right:5px;">⬇</span><b class="identities ident-small">付费</b>高品质</li>';
        } else {
            highht = '';
        }
        ht = '<h3>选择下载的品质</h3>' +
            '<div class="dialog_content dialog-downlod-music">' +
            '<ul class="cklist">' + lowht + highht + '</ul>' +
            '<a class="Closeit" onclick="closedialog();" title="" href="javascript:void(0);">关闭</a>';

        showDialog('', ht);
    };
})();