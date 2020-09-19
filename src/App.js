import React, { useState } from "react";
import './App.css';
import useWebAnimations from "@wellyshen/use-web-animations";

export default function App() {
  const [toggle, setToggle] = useState(false)
  const [loose, setLoose] = useState(false)
  const [t, setT] = useState(0)
  var x_transform=["translateX(150%)","translateX(-350%)"]



  const image_animation = useWebAnimations({
    playbackRate: 1,
    keyframes: {
      transform: ["translateY(0%) ", "translateY(-100%)"],

    },
    timing: {

      duration: 700,
      iterations: Infinity,
      easing: "steps(7,end)",
      direction: 'reverse',



    },
    autoPlay:false,
    onReady: ({ playState, animate, animation }) => {

      
    },

  });
  const image_scale = useWebAnimations({
    keyframes: {
      transform: ['scale(1)', 'scale(0.6)'],
    },
    timing: {
      duration: 10000,
      iterations: 1,
      easing: 'ease-in-out'
    },
    autoPlay:false,
    onReady: ({ playState, animate, animation }) => {
      // Triggered when the animation is ready to play (Google Chrome: available in v84+)
      
    },
    onUpdate: ({ playState, animate, animation }) => {

      if (animation.currentTime === animation.effect.getTiming().duration) {
        stopPlayingAlice()
      }

    },
    onFinish: ({ playState, animate, animation }) => {
      // Triggered when the animation is ready to play (Google Chrome: available in v84+)

    },
  })
  const foreground1_animation = useWebAnimations({

    keyframes: {
      transform: x_transform,
    },
    timing: {
      duration: 30000,
      iterations: 10000,
      direction: 'reverse',


    },
    autoPlay:false,
    onReady: ({ playState, animate, animation }) => {
      // Triggered when the animation is ready to play (Google Chrome: available in v84+)
      
    },

    onFinish: ({ playState, animate, animation }) => {

      

    }
  })

  const foreground2_animation = useWebAnimations({


    keyframes: {
      transform: x_transform,
    },
    timing: {
      duration: 30000,
      iterations: 10000,
      direction: 'reverse',


    },
    autoPlay:false,
    onReady: ({ playState, animate, animation }) => {
      // Triggered when the animation is ready to play (Google Chrome: available in v84+)
      
    },

    onFinish: ({ playState, animate, animation }) => {
      

    }

  })
  const background1_animation = useWebAnimations({

    keyframes: {
      transform: x_transform,
    },
    timing: {
      duration: 30000,
      iterations: 10000,
      direction: 'reverse',


    },
    autoPlay:false,
    onReady: ({ playState, animate, animation }) => {
      // Triggered when the animation is ready to play (Google Chrome: available in v84+)
      
    },

    onFinish: ({ playState, animate, animation }) => {
      // animation.updatePlaybackRate(-1)
      //  animation.play()

    }
  })
  const background2_animation = useWebAnimations({

    keyframes: {
      transform: x_transform,
    },
    timing: {
      duration: 30000,
      iterations: 10000,
      direction: 'reverse',


    },
    autoPlay:false,
    onReady: ({ playState, animate, animation }) => {
      // Triggered when the animation is ready to play (Google Chrome: available in v84+)
      
    },

    onFinish: ({ playState, animate, animation }) => {
      // animation.updatePlaybackRate(-1)
      //  animation.play()

    }
  })
  const sceneries = [foreground1_animation, foreground2_animation, background1_animation, background2_animation]




  const adjustBackgroundPlayback = () => {


    if (image_animation.getAnimation().playbackRate <= 0.8) {
      sceneries.forEach(function (anim) {
        anim.getAnimation().play()
        anim.getAnimation().updatePlaybackRate(1)
      });

      if (image_scale.getAnimation().playState === 'finished') {

        image_scale.getAnimation().reverse()



      }

    }

    else if (image_animation.getAnimation().playbackRate > 1.2) {
      sceneries.forEach(function (anim) {
        anim.getAnimation().play()
        anim.getAnimation().updatePlaybackRate(image_animation.getAnimation().playbackRate / 2 * -1)
      })
      image_scale.getAnimation().updatePlaybackRate(-1)

    }
  }


  const speedUp = () => {

    
    image_animation.getAnimation().updatePlaybackRate(image_animation.getAnimation().playbackRate * 1.1)
    adjustBackgroundPlayback()


  }

  const startAnime = () => {

    setToggle(!toggle)

    sceneries.forEach(function (anim) {
      anim.getAnimation().play()
    })
    image_animation.getAnimation().play()
    image_scale.getAnimation().play()
    setT(setInterval(() => {
      if (image_animation.getAnimation().playbackRate > .8) {

        image_animation.getAnimation().updatePlaybackRate(image_animation.getAnimation().playbackRate * 0.7)


      }

      adjustBackgroundPlayback();

    }, 3000))
  }
  const stopPlayingAlice = function () {
    image_animation.getAnimation().pause()
    sceneries.forEach(function (anim) {
      anim.getAnimation().pause()
    })
    image_scale.getAnimation().pause()
    clearInterval(t)
    setLoose(true)
    setToggle(false)
  }

  return (
    <div className='container'>
      <div className='start'>
        <button className={toggle ? 'toggle' : 'button'}
          onClick={startAnime}>{loose ? 'play again' : 'start'}</button>
      </div>
      <div className="wrapper" onClick={speedUp}>
        <div className="sky"></div>
        <div className="earth">
          <div id="red-queen_and_alice" ref={image_scale.ref}>
            <img id="red-queen_and_alice_sprite"

              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
              alt="Alice and the Red Queen running to stay in place."
              ref={image_animation.ref}
            />

          </div>
        </div>

        <div className="scenery" id="foreground1" ref={foreground1_animation.ref} >
          <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png"
            alt=" " />
        </div>
        <div className="scenery" id="foreground2" ref={foreground2_animation.ref}>
          <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png"
            alt=" " />
          <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png"
            alt=" " />
        </div>
        <div className="scenery" id="background1" ref={background1_animation.ref}>
          <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
            alt=" " />
          <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png"
            alt=" " />
          <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png"
            alt=" " />
        </div>
        <div className="scenery" id="background2" ref={background2_animation.ref}>
          <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png"
            alt=" " />

          <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png"
            alt=" " />
          <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png"
            alt=" " />
        </div>

      </div>
    </div>
  );
};