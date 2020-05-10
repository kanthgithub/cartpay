# Instructions to run the project:

- Project has 2 important components
 - Backend is under directory: server
 - Frontend is under directory: client

- tech pre-requisites:
  - Install nodeJS
  - Install nvm to set latest node version 

- Backend:
 1. Backend component is on nodeJS and expressJS.
 2. Open terminal and run command:
    1. change to directory server:

        ```sh
        $ cd server
        ```

    2. npm install

       ```sh
       $ npm install
       ```

    3. npm start

       ```sh
        $ npm start
       ```

3. After Successful execution of 3 sub-steps mentioned above, check your console

   - Console should show message that server side is running on port 4244
   - Sample log:
   ```js
        lakshmikanth-MacBook-Pro:server lakshmikanth$ npm start

        > cartpay-backend@1.0.0 start /Users/lakshmikanth/Desktop/Stripe/cartpay/server
        > nodemon server.js

        [nodemon] 2.0.3
        [nodemon] to restart at any time, enter `rs`
        [nodemon] watching path(s): *.*
        [nodemon] watching extensions: js,mjs,json
        [nodemon] starting `node server.js`
        Application listening in port  4244
   ```

- Frontend:

    - Pre-Requisite for Frontend is to have healthy backend in up and running state
    - Steps to bring Client/UI up-running:

        1. Open terminal.

        2. change to directory server.

            ```sh
            $ cd server
            ```

        2. npm install

            ```sh
            $ npm install
            ```

        3. npm start

            ```sh
                $ npm start
            ```

    -  After Successful execution of 3 sub-steps mentioned above, check your console

        - Console should show message that server side is running on port 8015
        - Sample log:
            ```js
                lakshmikanth-MacBook-Pro:client lakshmikanth$ npm start

                > shopping-cart@0.1.0 start /Users/lakshmikanth/Desktop/Stripe/cartpay/client
                > webpack-dev-server --config=config/webpack.dev.js

                ℹ ｢wds｣: Project is running at http://localhost:8015/
                ℹ ｢wds｣: webpack output is served from /
                ℹ ｢wds｣: Content not from webpack is served from /Users/lakshmikanth/Desktop/Stripe/cartpay/client/config/docs
                ℹ ｢wds｣: 404s will fallback to /index.html
                babel-preset-env: `DEBUG` option

                Using targets:
                {
                "chrome": "80",
                "android": "4.4.3",
                "edge": "80",
                "firefox": "74",
                "ie": "10",
                "ios": "13.2",
                "safari": "12.1"
                }

                Modules transform: commonjs

                Using plugins:
                check-es2015-constants {"android":"4.4.3","ie":"10"}
                transform-es2015-arrow-functions {"android":"4.4.3","ie":"10"}
                transform-es2015-block-scoped-functions {"android":"4.4.3","ie":"10"}
                transform-es2015-block-scoping {"android":"4.4.3","ie":"10"}
                transform-es2015-classes {"android":"4.4.3","ie":"10"}
                transform-es2015-computed-properties {"android":"4.4.3","ie":"10"}
                transform-es2015-destructuring {"android":"4.4.3","edge":"80","ie":"10"}
                transform-es2015-duplicate-keys {"android":"4.4.3","ie":"10"}
                transform-es2015-for-of {"android":"4.4.3","ie":"10"}
                transform-es2015-function-name {"android":"4.4.3","edge":"80","ie":"10"}
                transform-es2015-literals {"android":"4.4.3","ie":"10"}
                transform-es2015-object-super {"android":"4.4.3","ie":"10"}
                transform-es2015-parameters {"android":"4.4.3","ie":"10"}
                transform-es2015-shorthand-properties {"android":"4.4.3","ie":"10"}
                transform-es2015-spread {"android":"4.4.3","ie":"10"}
                transform-es2015-sticky-regex {"android":"4.4.3","ie":"10"}
                transform-es2015-template-literals {"android":"4.4.3","ie":"10"}
                transform-es2015-typeof-symbol {"android":"4.4.3","ie":"10"}
                transform-es2015-unicode-regex {"android":"4.4.3","ie":"10"}
                transform-regenerator {"android":"4.4.3","ie":"10"}
                transform-exponentiation-operator {"android":"4.4.3","ie":"10"}
                transform-async-to-generator {"android":"4.4.3","ie":"10"}
                syntax-trailing-function-commas {"android":"4.4.3","ie":"10"}
                ℹ ｢wdm｣: wait until bundle finished: /
                ℹ ｢wdm｣: Hash: a7f31de4672d4f19b2d6
                Version: webpack 4.43.0
                Time: 11346ms
                Built at: 05/10/2020 5:17:57 AM
                        Asset       Size  Chunks             Chunk Names
                    index.html  539 bytes          [emitted]  
                main.bundle.js   5.41 MiB    main  [emitted]  main
                Entrypoint main = main.bundle.js
                [0] multi (webpack)-dev-server/client?http://localhost:8015 (webpack)/hot/dev-server.js babel-polyfill ./src/index 64 bytes {main} [built]
                [./node_modules/babel-polyfill/lib/index.js] 833 bytes {main} [built]
                [./node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js] 23.9 KiB {main} [built]
                [./node_modules/core-js/fn/regexp/escape.js] 108 bytes {main} [built]
                [./node_modules/core-js/shim.js] 8.03 KiB {main} [built]
                [./node_modules/react-dom/index.js] 1.33 KiB {main} [built]
                [./node_modules/react/index.js] 190 bytes {main} [built]
                [./node_modules/strip-ansi/index.js] 161 bytes {main} [built]
                [./node_modules/webpack-dev-server/client/index.js?http://localhost:8015] (webpack)-dev-server/client?http://localhost:8015 4.29 KiB {main} [built]
                [./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.51 KiB {main} [built]
                [./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.53 KiB {main} [built]
                [./node_modules/webpack-dev-server/client/utils/createSocketUrl.js] (webpack)-dev-server/client/utils/createSocketUrl.js 2.91 KiB {main} [built]
                [./node_modules/webpack-dev-server/client/utils/log.js] (webpack)-dev-server/client/utils/log.js 964 bytes {main} [built]
                [./node_modules/webpack/hot/dev-server.js] (webpack)/hot/dev-server.js 1.59 KiB {main} [built]
                [./src/index.js] 478 bytes {main} [built]
                    + 567 hidden modules
                Child html-webpack-plugin for "index.html":
                    1 asset
                    Entrypoint undefined = index.html
                    [./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html] 688 bytes {0} [built]
                    [./node_modules/lodash/lodash.js] 528 KiB {0} [built]
                    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
                    [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {0} [built]
                ℹ ｢wdm｣: Compiled successfully.

            ```       