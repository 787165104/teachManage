/*danmu.js*/
// 弹幕默认是否显示

var jsondata = [
	"前端小组前来报到",
	"李式淼是傻逼~~~~~~~不用猜，我是邱汉文!!",
	"邱汉文是傻逼~~~~~~~不用猜，我是汪微!!",
	"汪微是大傻逼~~~~~~~不用猜，我是邓智荣!!",
	"邓智荣是傻逼~~~~~~~不用猜，我是李式淼!!",
	"原来启明星的前端那么多帅哥啊~~帅哥们！ 么么哒",
	"前端好多帅哥啊~~~其他部门也好多",
	"是啊是啊，前端好多帅哥啊。怎么办怎么办 ^ . ^",
	"大家冷静点，放开前端的男孩子们，让我来@ . @",
	"大家别急好不好，排队来约前端的帅哥啊 0 ^ 0",
	"我是前端小组的人 ^ _ = !   ",
	"5毛特效良心制作",
	"angelababy发来贺电……",
	"广东人民发来贺电.....",
	"深圳人民发来贺电.....",
	"吴彦祖表示很赞",
	"刘德华、黎明、张学友、郭富城、张国荣觉得很赞",
	"杨千嬅、王菲、郑秀文、陈慧琳、容祖儿觉得很赞",
	"松岛枫、饭岛爱、武藤兰、天海翼觉得很赞",
	"碧咸觉得很赞，碧咸觉得很赞，碧咸觉得很赞，",
	"汤姆克鲁斯准备到达启明星年会，还有30分钟",
	"安吉丽娜·朱莉、布拉德皮特觉得很赞",
	"从今天起大家可以叫我的英文名：沃德天·维森陌·拉莫帅·帅德·布耀布耀德",
	"妈妈，帮我关了那首爱的供养",
	"手撕鬼子比藏雷，中华儿女怕过谁",
	"他们告诉我不许动,我说我不可能不动；一动不动不就是王八了吗",
	"把你们最强的装逼王出来跟我单挑",
	"今晚跟你妈妈说，你在同学家里睡!!",
	"一吻定情的粉红，我的天，粉了我一个夏天",
	"前端的帅哥们，我要给你们生猴子",
	"我转过我的脸，不让你看见，深藏的暗涌已经越来越明显",
	"大力出奇迹。。大力出奇迹",
	"逼都给公司的技术部的人装完了。。。。。。",
	"宁愿没拥抱共你可到老。。。。。。",
	"如若碰到。他比我好。。只望停在远处祝君安好",
	"你瞅啥？ 再瞅我试试！！瞅你咋地！！",
	"妈妈问我为什么跪着看屏幕",
	"妈的，前端的人不就是要膝盖吗 给你好了！！！",
	"我觉得我的眼睛怀孕了！",
	"听说发个弹幕就不卡了【一般弹幕太多会有点卡】",
	"教练 我想学画画！教练，我想学唱歌！教练，我想学xxx！",
	"听说公司还有几十个情敌？来战！！！！",
	"我要顶上去报复社会↖(￣▽￣)",
	"舔屏 下巴打字以示清白",
	"前面说xx的等我！！",
	"我读得书少 别发弹幕糊弄我",
	"前面xxxx的你不是一个人！",
	"我用一生节操换xxxx永不完结！",
	"代码敲得好，老婆回家早！！！可惜我没老婆。。↖(￣▽￣)，因为我代码敲得不好",
	"樱花满地集于我心，楪舞纷飞祈愿相随",
	"我有一只小毛驴我从来也不骑，有一天我心血来潮骑着去赶集",
	"曾某年某一天某地，时间如静止的空气，你的不羁给我惊喜",
	"曾说同你创天与地，曾说无悔今生等你，也不担心分隔千里",
	"那么大的屏幕，非要发那么小弹幕挡住屏幕，不说了，举报不友善",
	"大家都是淘宝啊，怎么这么虐心啊",
	"恕我直言，我不是针对在座的谁，在拳皇98里面，你们都是渣渣",
	"温柔这种词，是夸没有其他优点的人才用的吧",
	"今年的这个夏天，我邂逅了我的命运。",
	"人生这个东西，前方是未来，后方是回忆，从中截取一段就叫做故事。",
	"如果有来生我要当床被子，不是躺在床上就是在晒太阳。",
	"来不及解释了，大家快上车",
	"技术部这样技术碾压的意思就是要开战咯，来啊，互相伤害啊",
	"很想偷呃拐骗的勾引 完了事便怀孕",
	"不在乎你心里还有谁，请让我给你安慰,不论结局是喜是悲",
	"当我知道你们相爱,我的心底泛起许多无奈",
	"妈妈，今晚我去同学家里读书学习，不回家睡觉了",
	"大家没事就发发弹幕吧，发弹幕又不会怀孕",
	"人生若只如初见，何事秋风悲画扇？",
	"明月多情应笑我，笑我如今，辜负春心，独自闲行独自吟",
	"我是人间惆怅客,  知君何事泪纵横,  断肠声里忆平生",
	"谁念西风独自凉？萧萧黄叶闭疏窗，沉思往事立残阳。",
	"被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常",
	"落花有意随流水，而流水无心恋落花！！！！！",
	"您好，请你跟我们走一趟，我们怀疑你装逼",
	"人到情多情转薄，而今真个悔多情；又到断肠回首处，泪偷零。",
	"山一程，水一程，身向逾关那畔行，夜深千帐灯。",
	"自古深情留不住，总是套路得人心",
	"总有一个人用一根棒棒糖追到你用金山都追不到的女孩",
	"等闲变却故人心，却道故人心易变。",
	"相逢不语，一朵芙蓉著秋雨。小晕红潮，斜溜鬟心只凤翘。",
	"喜欢你让我下沉喜欢你让我哭,能待续获得糟踏亦满足",
	"心声安葬在岩洞,上帝 四次三番再愚弄！！",
	"难道我有勇气与你在一起庆祝正日,难道你有勇气反悔诺言你专一",
	"已婚者不安心，未婚者不甘心，旁观者太热心",
	"那天醒来　忽然想开 ，不愿再做等待的男孩",
	"头发甩甩　大步的走开,不怜悯心底小小悲哀,挥手Bye-Bye 祝你们愉快",
	"昏鸦尽，小立恨因谁。急雪乍翻香阁絮，轻风吹到胆瓶梅。心字已成灰。",
	"醒来灯未灭。心事和谁说。只有旧罗裳。偷沾泪两行。",
	"雁书蝶梦皆成杳，云窗月户人声悄。记得画楼东，归骢系月中。",
	"喜欢你的人很多，不缺我一个，我喜欢的人很小，除了你就没有了",
	"大家别跪着看弹幕了，站起来边吃东西边看吧",
	"前排出售瓜子、可乐、花生。",
];

var config = {
	isDanmuShow: false,
	defaultText: '开启弹幕',
	url: 'ws://106.75.142.29:8002/nyp/websocket.connection?userName=root', //弹幕url
	colorArr: [0xCC00CC, 0xFFFF33, 0xFFFFF, 0x00CCFF], //弹幕颜色值列表
	sizeArr: [20, 20, 20, 20, 20], //弹幕字体大小列表
};

// 点击开启 | 关闭弹幕
$('div.begin-danmu').text(config.defaultText)
$('div.begin-danmu').click(function() {
	config.isDanmuShow = !config.isDanmuShow;
	if (config.isDanmuShow) {
		config.defaultText = "关闭弹幕";
		$('div.content-danmu').addClass('show').removeClass('hide');

		//开启弹幕
		CommentManagerRun();

	} else {
		$('div.content-danmu').addClass('hide').removeClass('show');
		config.defaultText = "开启弹幕";
	};
	$('div.begin-danmu').text(config.defaultText);
})

// 抒写弹幕
function CommentManagerRun() {
	var CM = new CommentManager(document.getElementById('my-comment-stage'));
	// 请求数据
	webSocketObject(CM);
	// 循环发送信息
	intervalSocket(CM);
	// 初始化
	CM.init();
	CM.start();
	CM.time(5000);
};

//webSocket 方法
function webSocketObject(CM) {
	var ws = new WebSocket(config.url);
	ws.onerror = function(event) {
		console.log(event.data);
	};
	ws.onopen = function(event) {
		console.log('弹幕开启')
	};
	ws.onmessage = function(event) {
		CM.send(setjson(event.data));
	};
	ws.onclose = function(evt) {
		webSocketObject(CM);
		console.log("关闭了！！，需要从新启动");
	};
};



// 循环发送弹幕
function intervalSocket(CM) {
	var index = 0;
	timer = setInterval(function() {
		clearInterval(timer);
		if (index >= jsondata.length) {
			index = 0;
		};
		CM.send(setjson(jsondata[parseInt(jsondata.length * Math.random())]));
		index++
		intervalSocket(CM);
	}, parseInt(Math.random() * 2 * 1000));
};


// 设置字体大小
function getrandow(arr, num) {
	var res = "";
	var id = Math.floor(Math.random() * num);
	res = arr[id];
	return res;
};



// 返回弹幕信息
function setjson(data) {
	var color = config.colorArr[Math.floor(Math.random() * 4)],
		size = getrandow(config.sizeArr, '4');
	if (!data) {
		return;
	}
	return {
		"mode": 1,
		"text": data,
		"dur": 10000,
		"size": 25,
		"size": size,
		"color": color
	};
}