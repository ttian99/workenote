//cicle 圆周运动

// JJ.Cicle = function(duration, times){
// 	return new JJ.cicle(duration, times);
// }
//here and there

// shake

//animation

/**
 * [JJ.Cicle description]
 * @param {[type]} duration [时间]
 * @param {[type]} times    [次数]
 */
JJ.Cicle = function(duration, times) {
	var rotateAction = cc.RotateBy.create(duration, 360);
	var repeatAction;
	if (times === 0) {
		repeatAction = cc.RepeatForever.create(rotateAction);
	} else {
		repeatAction = cc.Repeat.create(rotateAction, times);
	}
	return repeatAction;
};



JJ.Float = function(node, duration, aposX, aposY) {
	var moveBy = cc.MoveBy.create(duration, cc.p(aposX, aposY));
	var reverse = moveBy.reverse();
	var actionSequence = cc.Sequence.create(moveBy, reverse);
	var repeatFloat = cc.RepeatForever.create(actionSequence);

	repeatFloat.setTag(10010);
	node.runAction(repeatFloat);
	return node;
}


JJ.Shake = function(node, callback) {
	var posX = node.x;
	var posY = node.y;
	// node.removeAllActions();
	node.runAction(new cc.Sequence(
		// new cc.DelayTime(1),
		new cc.JumpTo(0.02, cc.p(posX + 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX + 0, posY - 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX + 5, posY), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX + 0, posY - 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX, posY), 50, 0),
		//重复一次
		new cc.JumpTo(0.02, cc.p(posX + 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX + 0, posY - 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX + 5, posY), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX + 0, posY - 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX, posY), 50, 0),
		//重复两次
		new cc.JumpTo(0.02, cc.p(posX + 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX + 0, posY - 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX + 5, posY), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX + 0, posY - 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY + 5), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX - 5, posY), 50, 0),
		new cc.JumpTo(0.02, cc.p(posX, posY), 50, 0),
		//回调函数
		new cc.CallFunc(callback)
	));
}

JJ.stopFloatAction = function(node) {
	if (node.getActionByTag(10010)) {
		node.stopActionByTag(10010);
	}
};

var rRange = function (n, m, loop) {
	var rNum = Math.random();
	// console.log("rNum = " + rNum);
	var c = m - n + 1;
	var num = Math.floor(Math.random() * c + n);
	if (rNum < 0.5 && loop === true){
		num = -num;
	}
	// console.log("num = " + num);
	return num;
}


JJ.Feather = function(node, filename, callback) {
	posX = node.width / 2
	posY = node.height / 2;
	// console.log("posX========="+posX +"           ;posY======="+posY);
	// var num = Math.floor(Math.random());
	// console.log(Math.random());
	// var rRot = Math.random() * 180;
	// console.log(rRot);
	var feather = [];
	for (i = 0; i < 12; i++) {
		var flag = Math.floor(Math.random() * 2);
		var num1= rRange(0,30,true);
		var num2= rRange(0,30,true);
		var num3= rRange(0,360,true);
		var num4= rRange(5,100,true);
		// if (flag === 1) {
		// 	num1 = -num1;
		// 	num2 = -num2;
		// }
		console.log("num1 = "+ num1);
		console.log("num2 = "+ num2);
		console.log("num3 = "+ num3);
		feather[i] = JJ.exNode(new cc.Sprite(filename)).anchor_(0.5, 0.5).addTo_(node).pos_(posX , posY ).rotation_(num3).scale_(1);
		
		var del = 30;
		if (num1 < 0){
			delX = posX + num1 - 30;
		} else {
			delX = posX + num1 + 30;
		}

		if (posY < 0){
			delY = posY - num2 - 30;
		} else {
			delY = posY + num2 + 30;
		}

		var boom = new cc.Sequence(
			// new cc.MoveTo(0.1, cc.p(delX, delY))
			new cc.JumpTo(0.2, cc.p(delX, delY), 10, 0)
		);
		var rotateAction = new cc.Sequence(
			new cc.RotateTo(0.4, 0),
			new cc.RotateBy(0.3, num4),
			new cc.RotateBy(0.3, -num4 * 0.8),
			new cc.RotateTo(0.2, 0)
		);

		var moveAction = new cc.EaseSineOut(
			new cc.Sequence(
				boom,
				new cc.MoveBy(3,cc.p(0, -50)),
				new cc.CallFunc(callback)
			)
		);

		// var action1 = new cc.EaseBounceOut(
		// 	new cc.Sequence(
		// 		// new cc.MoveTo(0.12, cc.p(posX + (Math.random() * 100), posY + (Math.random() * 80))),
		// 		new cc.RotateTo(0.5, 0),
		// 		new cc.RotateBy(0.5, num * 100),
		// 		new cc.RotateBy(0.5, -80 * num),
		// 		new cc.RotateTo(0.5, 0)
		// 		// new cc.CallFunc(node.removeFromParent(true))
		// 	));
		var action2 = new cc.Spawn(
			new cc.MoveBy(3, cc.p(0, -40)),
			new cc.FadeOut(3)
		);

		feather[i].runAction(new cc.Spawn(
			rotateAction,
			moveAction,
			new cc.FadeOut(2)
		));
	}
	// console.log(num);
	// var rPos = Math.floor(Math.random() * 10);
	// var rPosX, rPosY;
	// if (num === 1) {
	// 	rPosX = -rPos;
	// }
	// rPosY = rPos;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 10, posY + 0).rotation_(Math.random() * 180);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 10, posY + 10).rotation_(Math.random() * 180);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 0, posY + 10).rotation_(Math.random() * 180);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 0, posY + 0).rotation_(Math.random() * 180);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 20, posY + 0).rotation_(Math.random() * 180);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 20, posY + 10).rotation_(Math.random() * 180);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 20, posY + 20).rotation_(Math.random() * 180);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 10, posY + 20).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 0, posY + 20).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 30, posY + 0).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 30, posY + 10).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 30, posY + 20).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 30, posY + 30).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 20, posY + 30).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 10, posY + 30).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 0, posY + 30).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 40, posY + 0).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 40, posY + 10).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 40, posY + 20).rotation_(Math.random() * 180);;
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 40, posY + 0);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 0, posY + 40);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 10, posY + 40);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 20, posY + 40);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 30, posY + 40);
	// JJ.exNode(new cc.Sprite("res/main/box00_feather.png")).anchor_(0.5, 0.5).addTo_(node).pos_(posX + 40, posY + 40);
}