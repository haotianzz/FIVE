import * as info from './datas.js';
(function () {
    var datas = info.datas;
    var goodsinfo = localStorage.getItem('goodsinfo');
    if (goodsinfo) {
        // 如果购物车有商品
        // DOM元素操作
        document.querySelector('.nullinfo').style.display = 'none';
        document.querySelector('.mygoods').style.display = 'block';
        document.querySelector('.body-bottom').style.display = 'block';
        document.querySelector('.whatido').style.display = 'block';
        // 处理数据
        let showgoods = null;
        function takeinfo(goodsinfo) {
            showgoods = {};
            let getgoods = goodsinfo.split('/').reverse();
            for (let i = 1; i < getgoods.length; i++) {
                showgoods[getgoods[i]] = showgoods[getgoods[i]] ? ++showgoods[getgoods[i]] : 1;
            }
        }
        takeinfo(goodsinfo);
        // 数据渲染
        var deinfo = '';
        var howmany = 0;
        var totalmoney = 0;
        for (let ele in showgoods) {
            let getid = ele.split(',')[0];
            let getsize = ele.split(',')[1];
            let goodsnum = showgoods[ele];
            let nowgoods = null;
            let lpicind = -1;
            for (let i = 0; i < datas.length; i++) {
                if (datas[i].id === getid) {
                    nowgoods = datas[i];
                    for (let j = 0; j < nowgoods.allcolors.length; j++) {
                        if (nowgoods.allcolors[j][0] === nowgoods.color) {
                            lpicind = j;
                            break;
                        }
                    }
                    break;
                }
            }
            deinfo += `<tr><td><input type="checkbox" checked></td><td class="showimg"><a href="./details.html" target="_blank"><img src="${nowgoods.allcolors[lpicind][1]}" alt=""></a></td><td><div class="detail"><span>[促销]<a href="#"> 2022年4月特惠</a></span><span>Five Plus</span><a href="./details.html">${nowgoods.name}</a><span>货号: ${nowgoods.id}</span></div></td><td><a href="javascript:;">${nowgoods.color}/${getsize}</a><i class="iconfont icon-xiajiantou"></i></td><td><span>￥${nowgoods.nowprice.toFixed(2)}</span></td><td><div class="num"><div class="up"><i class="iconfont icon-shangjiantou"></i></div><div class="down"><i class="iconfont icon-xiajiantou"></i></div><input type="text" value="${goodsnum}" readonly></div><a href="./login.html">收藏</a>&nbsp;/&nbsp;<a href="#" class="delete">删除</a></td><td><span>￥${nowgoods.nowprice.toFixed(2)}</span></td></tr>`;
            ++howmany;
            totalmoney += nowgoods.nowprice;
        }
        document.querySelector('tbody').innerHTML = deinfo;
        document.querySelector('.header .rightas a:last-child').innerText = `购物袋(${howmany})`;
        document.querySelector('.total .selectNum span:nth-child(2)').innerText = howmany;
        document.querySelector('.total .money span:last-child').innerText = totalmoney.toFixed(2);
        var checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
        // 实现功能
        // checkboxes
        function upfun() {
            let ifAll = true;
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].onclick = function () {
                    let nowmoney = parseFloat(this.parentNode.parentNode.children[6].children[0].innerText.slice(1));
                    let nowtotal = parseFloat(document.querySelector('.total .money span:last-child').innerText);
                    let nowgnum = parseFloat(this.parentNode.parentNode.children[5].children[0].children[2].value);
                    if (this.checked) {
                        document.querySelector('.total .money span:last-child').innerText = (nowmoney + nowtotal).toFixed(2);
                        document.querySelector('.total .selectNum span:nth-child(2)').innerText = parseFloat(document.querySelector('.total .selectNum span:nth-child(2)').innerText) + nowgnum;
                        document.querySelector('.header .rightas>a:last-child').innerText = `购物袋(${document.querySelector('.total .selectNum span:nth-child(2)').innerText})`;
                        for (let i = 0; i < checkboxes.length; i++) {
                            if (!checkboxes[i].checked) {
                                break;
                            }
                            if (i == checkboxes.length - 1) {
                                document.querySelector('.body-bottom .cando input').checked = true;
                            }
                        }
                    } else {
                        document.querySelector('.total .money span:last-child').innerText = (nowtotal - nowmoney).toFixed(2);
                        document.querySelector('.total .selectNum span:nth-child(2)').innerText -= nowgnum;
                        document.querySelector('.header .rightas>a:last-child').innerText = `购物袋(${document.querySelector('.total .selectNum span:nth-child(2)').innerText})`;
                        if (document.querySelector('.body-bottom .cando input').checked) {
                            document.querySelector('.body-bottom .cando input').checked = false;
                        }
                    }
                }
                if (!checkboxes[i].checked) {
                    ifAll = false;
                }
            }
            if (ifAll) {
                document.querySelector('.body-bottom .cando input').checked = true;
            }
        }
        upfun();
        // 全选按钮
        document.querySelector('.body-bottom .cando input').onclick = function () {
            if (this.checked) {
                for (let i = 0; i < checkboxes.length; i++) {
                    if (!checkboxes[i].checked) {
                        checkboxes[i].checked = true;
                        checkboxes[i].onclick();
                    }
                }
            } else {
                for (let i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        checkboxes[i].checked = false;
                        checkboxes[i].onclick();
                    }
                }
            }
        }
        // 增减商品数量
        var ups = document.querySelectorAll('.num .up i');
        var downs = document.querySelectorAll('.num .down i');
        for (let i = 0; i < ups.length; i++) {
            ups[i].addEventListener('click', function () {
                this.parentNode.parentNode.children[2].value = parseFloat(this.parentNode.parentNode.children[2].value) + 1;
                let thisprice = parseFloat(this.parentNode.parentNode.parentNode.parentNode.children[4].innerText.slice(1));
                let thistotal = parseFloat(this.parentNode.parentNode.parentNode.parentNode.children[6].innerText.slice(1));
                this.parentNode.parentNode.parentNode.parentNode.children[6].children[0].innerText = '￥' + (thisprice + thistotal).toFixed(2);
                if (this.parentNode.parentNode.parentNode.parentNode.children[0].children[0].checked) {
                    let nowtotal = parseFloat(document.querySelector('.total .money span:last-child').innerText);
                    document.querySelector('.total .money span:last-child').innerText = (thisprice + nowtotal).toFixed(2);
                    document.querySelector('.total .selectNum span:nth-child(2)').innerText = parseFloat(document.querySelector('.total .selectNum span:nth-child(2)').innerText) + 1;
                    document.querySelector('.header .rightas>a:last-child').innerText = `购物袋(${document.querySelector('.total .selectNum span:nth-child(2)').innerText})`;
                }
            })
            downs[i].addEventListener('click', function () {
                if (this.parentNode.parentNode.children[2].value != 1) {
                    this.parentNode.parentNode.children[2].value -= 1
                    let thisprice = parseFloat(this.parentNode.parentNode.parentNode.parentNode.children[4].innerText.slice(1));
                    let thistotal = parseFloat(this.parentNode.parentNode.parentNode.parentNode.children[6].innerText.slice(1));
                    this.parentNode.parentNode.parentNode.parentNode.children[6].children[0].innerText = '￥' + (thistotal - thisprice).toFixed(2);
                    if (this.parentNode.parentNode.parentNode.parentNode.children[0].children[0].checked) {
                        let nowtotal = parseFloat(document.querySelector('.total .money span:last-child').innerText);
                        document.querySelector('.total .money span:last-child').innerText = (nowtotal - thisprice).toFixed(2);
                        document.querySelector('.total .selectNum span:nth-child(2)').innerText -= 1;
                        document.querySelector('.header .rightas>a:last-child').innerText = `购物袋(${document.querySelector('.total .selectNum span:nth-child(2)').innerText})`;
                    }
                }
            })
        }
        // 点击商品跳转详情页
        var picas = document.querySelectorAll('tbody .showimg a');
        var deas = document.querySelectorAll('tbody .detail>a');
        for (let i = 0; i < picas.length; i++) {
            picas[i].addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.setItem('detailinfo', this.parentNode.nextElementSibling.children[0].children[3].innerText.slice(4));
                location.href = './details.html';
            })
            deas[i].addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.setItem('detailinfo', this.nextElementSibling.innerText.slice(4));
                location.href = './details.html';
            })
        }
        // 点击更换商品
        var rechooses = document.querySelectorAll('tbody tr td:nth-child(4)>*');
        var whochooing = null;
        for (let i = 0; i < rechooses.length; i++) {
            let resetcolor = [];
            rechooses[i].addEventListener('click', function () {
                var that = this;
                resetcolor = [];
                if (document.querySelector('.rechoose').style.display === 'block' && whochooing == this) {
                    document.querySelector('.rechoose').style.opacity = 0;
                    setTimeout(() => {
                        document.querySelector('.rechoose').style.display = 'none';
                    }, 500);
                } else {
                    whochooing = this;
                    var nowbuycolor = this.parentNode.children[0].innerText.split('/')[0];
                    var nowbuysize = this.parentNode.children[0].innerText.split('/')[1];
                    var allitems = '';
                    let nowid = this.parentNode.previousElementSibling.children[0].children[3].innerText.slice(4);
                    let nowgoods = null;
                    for (let i = 0; i < datas.length; i++) {
                        if (datas[i].id === nowid) {
                            nowgoods = datas[i];
                        }
                    }
                    for (let j = 0; j < nowgoods.allcolors.length; j++) {
                        allitems += `<div class="rechooseitem"><a href="#" title="${nowgoods.allcolors[j][0]}"><img src="${nowgoods.allcolors[j][1]}" alt=""></a>`
                        for (let k = 0; k < nowgoods.sizes.length; k++) {
                            if (nowgoods.allcolors[j][0] === nowbuycolor && nowgoods.sizes[k] === nowbuysize) {
                                allitems += `<button class="selected">${nowbuysize}</button>`;
                            } else {
                                if (nowgoods.sizes[k].charAt(0) !== '-') {
                                    allitems += `<button>${nowgoods.sizes[k]}</button>`;
                                }
                            }
                        }
                        allitems += '</div>';
                    }
                    document.querySelector('.rechoose').style.display = 'block'
                    document.querySelector('.rechoose .rechoose_items').innerHTML = allitems;
                    document.querySelector('.rechoose').style.left = this.parentNode.getBoundingClientRect().left - this.parentNode.offsetWidth * 3 + 'px';
                    document.querySelector('.rechoose').style.top = this.parentNode.getBoundingClientRect().top + document.documentElement.scrollTop + (this.parentNode.offsetHeight) / 3 + 'px';
                    setTimeout(function () {
                        document.querySelector('.rechoose').style.opacity = 1;
                    }, 0)
                    // 弹框的功能实现
                    var canseletbuttons = document.querySelectorAll('.rechooseitem button');
                    for (let j = 0; j < canseletbuttons.length; j++) {
                        canseletbuttons[j].addEventListener('click', function () {
                            for (let k = 0; k < canseletbuttons.length; k++) {
                                if (canseletbuttons[k].className !== 'selected') {
                                    canseletbuttons[k].className = '';
                                }
                            }
                            this.className = 'resetcolor';
                        })
                    }
                    document.querySelector('.rechoosebtns button:first-child').onclick = function () {
                        for (let j = 0; j < canseletbuttons.length; j++) {
                            if (canseletbuttons[j].className === 'resetcolor') {
                                resetcolor.push(canseletbuttons[j].parentNode.children[0].children[0].getAttribute('src'));
                                resetcolor.push(canseletbuttons[j].innerText);
                                resetcolor.push(canseletbuttons[j].parentNode.children[0].getAttribute('title'))
                                break;
                            }
                        }
                        document.querySelector('.rechoosebtns button:nth-child(2)').onclick();
                        if (resetcolor.length != 0) {
                            that.parentNode.parentNode.children[1].children[0].children[0].setAttribute('src', resetcolor[0]);
                            that.parentNode.parentNode.children[3].children[0].innerText = `${resetcolor[2]}/${resetcolor[1]}`;
                        }
                    }
                    document.querySelector('.rechoosebtns button:nth-child(2)').onclick = function () {
                        document.querySelector('.rechoose').style.opacity = 0;
                        setTimeout(() => {
                            document.querySelector('.rechoose').style.display = 'none';
                        }, 500);
                    }
                }
            })
        }
        var deletes = document.querySelectorAll('.delete');
        for (let i = 0; i < deletes.length; i++) {
            deletes[i].addEventListener('click', function (e) {
                e.preventDefault();
                var thisgood = `${this.parentNode.parentNode.children[2].children[0].children[3].innerText.slice(4)},${this.parentNode.parentNode.children[3].children[0].innerText.split('/')[1]}`;
                console.log(thisgood);
                let newinfo = '';
                for (let item in showgoods) {
                    if (!item.includes(thisgood)) {
                        for (let j = 0; j < showgoods[item]; j++) {
                            newinfo += item + '/';
                        }
                    }
                }
                this.parentNode.parentNode.style.opacity = 0;
                if (this.parentNode.parentNode.children[0].children[0].checked) {
                    this.parentNode.parentNode.children[0].children[0].checked = false;
                    this.parentNode.parentNode.children[0].children[0].onclick();
                }
                setTimeout(function () {
                    this.parentNode.parentNode.style.display = 'none';
                    this.parentNode.parentNode.children[0].children[0].setAttribute('type', 'text');
                    checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
                    setTimeout(function () {
                        upfun();
                    }, 0)
                }.bind(this), 500)
                takeinfo(newinfo);
                localStorage.setItem('goodsinfo', newinfo);
            })
        }
        // 删除已选
        document.querySelector('.cando>a').addEventListener('click', function () {
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    checkboxes[i].parentNode.parentNode.children[5].children[2].click();
                }
            }
            setTimeout(function () {
                location.reload();
            }, 500)
        })
        // 点击支付
        document.querySelector('.body-bottom .givemoney').addEventListener('click', function () {
            location.href = './login.html';
        })
    } else {
        document.querySelector('.nullinfo').style.display = 'flex';
        document.querySelector('.mygoods').style.display = 'none';
        document.querySelector('.body-bottom').style.display = 'none';
        document.querySelector('.whatido').style.display = 'none';
    }

    // 手动添加随机数据
    document.querySelector('.myfixedbutton').addEventListener('click', function () {
        let getnum = Math.floor(Math.random() * 5) + 5;
        let inputgoods = '';
        for (let i = 0; i < getnum; i++) {
            let goodrandom = Math.floor(Math.random() * datas.length);
            let sizerandom = Math.floor(Math.random() * datas[goodrandom].sizes.length);
            while (datas[goodrandom].sizes[sizerandom].charAt(0) === '-') {
                sizerandom = Math.floor(Math.random() * datas[goodrandom].sizes.length);
            }
            inputgoods += `${datas[goodrandom].id},${datas[goodrandom].sizes[sizerandom]}/`;
        }
        console.log(inputgoods);
        if (goodsinfo) {
            localStorage.setItem('goodsinfo', goodsinfo + inputgoods);
        } else {
            localStorage.setItem('goodsinfo', inputgoods);
        }
        location.reload();
    })
})()