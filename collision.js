"use strictt";
// Looks a bit hacky but could be optimized I guess
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
            if (Math.abs(s.bottom - o.top) >= 0 && 
            (Math.abs(s.right - o.left) > botTol) && 
            (Math.abs(s.left - o.right) > botTol) && 
            s.oldBot < o.top){
                //Bottom Touches
                square.setBottom(o.top - tolerance);
                square.speed.y = 0; // Gravity = 0
                square.jumping = false;
            }
            // Top collision
            else if (s.top <= o.bottom && s.oldTop > o.bottom) {
                console.log('Top Touches');
                square.setTop(o.bottom + tolerance);
            }
            else if(s.right >= o.left && s.oldRight < o.left){
                // Right Touches
                square.setRight(o.left - tolerance);
                // square.position.x = o.left - square.size.w;
            }
            else if (s.left <= o.right && s.oldLeft > o.right){
                // Left Touches
                square.setLeft(o.right + tolerance);
                // square.position.x = o.right;
            }

        }
    }
}
