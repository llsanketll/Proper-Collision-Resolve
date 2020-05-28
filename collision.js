"use strictt";
export function collide(square, obj) {

    let s = {
        bottom: square.position.y + square.size.h,
        top: square.position.y,
        left: square.position.x,
        right: square.position.x + square.size.w,
        oldTop: square.oldPos.y,
        oldBot: square.oldPos.y + square.size.h,
        oldLeft: square.oldPos.x,
        oldRight: square.oldPos.x + square.size.w
    };

    let o = {
        bottom: obj.position.y + obj.size.h,
        top: obj.position.y,
        left: obj.position.x,
        right: obj.position.x + obj.size.w
    };

    return {
        test: function () {
            if (s.bottom >= o.top && s.top <= o.bottom && s.right >= o.left && s.left <= o.right) {
                return true;
            } else {
                return false;
            }
        },

        react: function () {
            let tolerance = 0.1;
            let botTol = 5;
            //Bottom Touches
            if (Math.abs(s.bottom - o.top) >= 0 &&
                (Math.abs(s.right - o.left) > botTol) && // It is not on the right
                (Math.abs(s.left - o.right) > botTol) &&  // It is not on the left
                Math.abs(s.oldBot - o.top) < botTol) {
                square.setBottom(o.top - tolerance);
                square.speed.y = obj.speed.y;
                square.speed.x *= 0.9;
                square.jumping = false;

                // Top Touches
            } else if (Math.abs(s.top - o.bottom) >= botTol &&
                (Math.abs(s.right - o.left) > botTol) &&
                (Math.abs(s.left - o.right) > botTol) &&
                Math.abs(s.oldTop - o.bottom) < botTol) {
                square.setTop(o.bottom + tolerance);
                square.speed.y = obj.speed.y;

                // Right Touches
            } else if (Math.abs(s.right - o.left) <= botTol) {
                square.setRight(o.left);
                square.speed.x = obj.speed.x;
                // Left Touches
            } else if (Math.abs(s.left - o.right) <= botTol) {
                square.setLeft(o.right);
                square.speed.x = obj.speed.x;

            }
        }
    }
}
