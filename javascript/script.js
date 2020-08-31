
      var ball_x = 0;
      var ball_y = 0;
      var mouse_x = 0;
      var mouse_y = 0;
      var vel_x = 0;
      var vel_y = 0;

      const docStyle = document.documentElement.style;
      const strength = 0.15;
      const drag = 0.15;

      document.addEventListener("mousemove", (event) => {

        mouse_x = event.clientX;
        mouse_y = event.clientY;

      });

      function delayMotion() {

        var distance_x = mouse_x - ball_x;
        distance_x *= strength;
        vel_x *= drag;
        vel_x += distance_x;

        ball_x += vel_x;
        // console.log("distance_x: ", distance_x);
        // console.log("mouse_x: ", mouse_x);
        // console.log("ball_x: ", ball_x);

        var distance_y = mouse_y - ball_y;
        distance_y *= strength;
        vel_y *= drag;
        vel_y += distance_y;

        ball_y += vel_y;

        docStyle.setProperty("--mouse-x", ball_x);
        docStyle.setProperty("--mouse-y", ball_y);

        docStyle.setProperty("--scale", (vel_x + vel_y) * strength);

        requestAnimationFrame(delayMotion);

      }

      delayMotion();
