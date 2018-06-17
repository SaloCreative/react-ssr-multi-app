echo 'Enter the title of your app'
read APP

echo 'apollo or redux?'
options=("APOLLO" "REDUX")
select TYPE in "${options[@]}" "Quit";
do
  case "$REPLY" in
    1) echo "you chose choice $TYPE";;
    2) echo "you chose choice $TYPE";;
    $(( ${#options[@]}+1 )) ) echo "Goodbye!"; break;;
    *) echo "Invalid option. Try another one.";continue;;
  esac
  APP_NAME=`echo ${APP:0:1} | tr  '[a-z]' '[A-Z]'`${APP:1}
  APP_DIR=./source/js/apps/$APP
  CONTROLLER_DIR=./source/js/server/controllers/$APP.js
  ROUTES_FILE=./source/js/server/routes.js
  NEW_ROUTES="app\.route('\/$APP')\.get(handleCookies, show$APP_NAME)\; app\.route('\/$APP\/\*')\.get(handleCookies, show$APP_NAME)\;"
  NEW_ROUTE_IMPORT="import show$APP_NAME from './controllers/$APP';"

  echo 'Checking app is unique'
  if [ ! -d "$APP_DIR" ]; then
    echo '=> SUCCESS'
    echo 'Adding app folder and boilerplate'
    cp -R "./lib/APP_NAME_$TYPE" $APP_DIR
    ex -sc "%s/\<APP_NAME\>/$APP/g|x" $APP_DIR/config/index.js
    echo '=> SUCCESS'

    echo 'Adding the controller for SSR'
    cp "./lib/controller_$TYPE.js" $CONTROLLER_DIR
    ex -sc "%s/\<APP_NAME\>/$APP/g|x" $CONTROLLER_DIR
    echo '=> SUCCESS'

    echo 'Adding SSR route to express'
    NEW_ROUTES=$(sed "/};/s/^/$NEW_ROUTES/" $ROUTES_FILE)
    echo $NEW_ROUTES > $ROUTES_FILE
    echo $NEW_ROUTE_IMPORT | cat - $ROUTES_FILE > temp && mv temp $ROUTES_FILE
    echo '=> SUCCESS'

    echo 'Hooking up webpack & translations'
    ex -sc "2i|"\'$APP\'"," -cx ./webpack.config.js
    touch ./source/locales/en/$APP.json

    echo '=> DONE! Cleaning up'
    break;

  else
    echo 'ERROR: Sorry that app appears to exist already'
    break;
  fi
done