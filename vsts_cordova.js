
// Usage under VSTS project in nodejs command line
// 1) After 'Get Ressource' task for initialization (variable and git config):
// (New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/rlscal/devops/master/vsts_cordova.js", "$home\vsts_cordova.js");
// node $home\vsts_cordova.js gitinit;

// 2) To commmit & push to remote GIT:
// node $home\vsts_cordova.js  gitcommitpush "your comment"

console.log("Start loading vsts_cordova.js");
function fn_gitinit() {
if (! process.env.variables_status) {
fn_get_vsts_variables();
}
fn_display_variables();
if (process.env.git_urlcred) {
console.log("remote set-url origin \"$git_urlcred\""); // git remote set-url origin process.env.git_urlcred 2>&1 ;
console.log("checkout master") ; // git checkout master 2>&1 ;
console.log("git show-branch --all"); // git show-branch --all;
console.log("git config --global core.autocrlf input"); // git config --global core.autocrlf input 2>&1;
console.log("git config --global user.name \"$git_config_username\""); // git config --global user.name process.env.git_config_username;
console.log("git config --global user.email \"$process.env.git_config_email\""); // git config --global user.email process.env.git_config_email;
}
else {
console.log("ERROR, missing or empty variable $git_urlcred");
}
}

function fn_gitcommitpush([string]$commit_msg) {
if (! process.env.variables_status) {
fn_get_vsts_variables();
fn_display_variables();
}
if (process.env.git_urlcred) {
console.log("git add -A"); // git add -A 2>&1;
console.log("git commit -m \"$commit_msg\""); // git commit -m "$commit_msg" 2>&1;
console.log("git push origin master"); // git push origin master 2>&1;
}
else {
console.log("ERROR, missing or empty variable $git_urlcred");
}
}

function fn_get_vsts_variables() {
// define Environment variable used by this module
process.env.variables_status="OK";

//process.env.BUILD_REPOSITORY_URI : come from VSTS Get Ressource Task;
if (process.env.BUILD_REPOSITORY_URI) {
//process.env.CORDOVA_DEFAULT_VERSION=;
//process.env.appname=; // cordova application name
//process.env.git_config_email=; // email for GIT commit under VSTS
//process.env.git_config_username=; // user name for GIT commit under VSTS
//process.env.git_pwd=; // user pwd for git remote access
//process.env.git_user=; // user login for git remote access

process.env.git_urlcred="https://"+process.env.git_user+":"+process.env.git_pwd+"@"+process.env.BUILD_REPOSITORY_URI.toString().subString(8));
}
else {
console.log("ERROR, missing or empty variable $BUILD_REPOSITORY_URI");
}
}

function fn_display_variables() {
console.log("$BUILD_REPOSITORY_URI="+process.env.BUILD_REPOSITORY_URI);
console.log("$CORDOVA_DEFAULT_VERSION="+process.env.CORDOVA_DEFAULT_VERSION);
console.log("$appname="+process.env.appname);
console.log("$git_config_email="+process.env.git_config_email);
console.log("$git_config_username="+process.env.git_config_username);
console.log("$git_pwd="+process.env.git_pwd);
console.log("$git_user="+process.env.git_user);

console.log("$git_urlcred="+process.env.git_urlcred);

}
console.log("End loading vsts_cordova.js")


