// module vsts_cordova_local.js
function fn_local_variables() {
    console.log("function fn_local_variables: to test localy instead of running under vsts");
    process.env.BUILD_REPOSITORY_URI="your_git_URL";
    process.env.CORDOVA_DEFAULT_VERSION="6.1.0";
    process.env.appname="your_app_name";
    process.env.git_config_username="git_username_for_commit";
    process.env.git_config_email="git_email_address_for_commit";
    process.env.git_user="git_user_to_connect_to_git_repo";
    process.env.git_pwd="git_password_to_connect_to_git_repo";
}
fn_local_variables();
require('./vsts_cordova.js');
