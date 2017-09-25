// 
// Download this js module once per build pipelile (workflow)
// (New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/rlscal/devops/master/vsts_cordova.js", "$home\vsts_cordova.js");
// call with "--help" option to get information

lc_scriptname="vsts_cordova.js";
console.log("Start " + lc_scriptname);

function fn_help() {
    console.log("To be used in VSTS project in nodejs command line");

    console.log("Usage: node $home/" + lc_scriptname + " command [option] ");
    console.log("  Commands");
    console.log("\t--help : \t\t\tDisplay module help");
    
    console.log("\t--gitinit : \t\t\t\
For git initialization (git config), after After 'Get Ressource' task.\n");

    console.log("\t--gitcommitpush {'your_comment'} : \t\
To commmit & push to remote GIT with your commant in parameter.\n");
}

function fn_init() {
    console.log(process.argv);
    
    if ((process.argv.length <= 2)) {
        fn_help();
         // process.exit(-1);
    }
    else
    {
        switch (process.argv[2])
        {
        case "--gitinit":
            fn_gitinit();
        break;
        case "--gitcommitpush":
            fn_gitcommitpush(process.argv[3]);
        break;
        default: 
            fn_help();
        break;
        }
    }
}

function fn_gitinit() {
if (! process.env.variables_status) {
fn_get_vsts_variables();
}
fn_display_variables();
if (process.env.git_urlcred) {
console.log("remote set-url origin \"$git_urlcred\""); git remote set-url origin process.env.git_urlcred  ;
console.log("checkout master") ; git checkout master ;
console.log("git show-branch --all"); git show-branch --all;
console.log("git config --global core.autocrlf input"); git config --global core.autocrlf input ;
console.log("git config --global user.name " + process.env.git_config_username); git config --global user.name process.env.git_config_username;
console.log("git config --global user.email " + process.env.git_config_email); git config --global user.email process.env.git_config_email;
}
else {
console.log("ERROR, missing or empty variable $git_urlcred");
}
}

function fn_gitcommitpush(commit_msg) {
if (!commit_msg) {
    commit_msg = "";
}
else if (!(typeof commit_msg !== 'string') ) {
    commit_msg = commit_msg.toString();
}

if (! process.env.variables_status) {
fn_get_vsts_variables();
fn_display_variables();
}
if (process.env.git_urlcred) {
console.log("git add -A"); git add -A ;
console.log("git commit -m \"" + commit_msg + "\""); git commit -m "$commit_msg" ;
console.log("git push origin master"); git push origin master ;
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
//process.env.git_config_username=; // user name for GIT commit under VSTS
//process.env.git_config_email=; // email for GIT commit under VSTS
//process.env.git_user=; // user login for git remote access
//process.env.git_pwd=; // user pwd for git remote access

process.env.git_urlcred="https://"+process.env.git_user+":"+process.env.git_pwd+"@"+process.env.BUILD_REPOSITORY_URI.toString().substring(8);
}
else {
console.log("ERROR, missing or empty variable $BUILD_REPOSITORY_URI");
}
}

function fn_display_variables() {
console.log("$BUILD_REPOSITORY_URI="+process.env.BUILD_REPOSITORY_URI);
console.log("$CORDOVA_DEFAULT_VERSION="+process.env.CORDOVA_DEFAULT_VERSION);
console.log("$appname="+process.env.appname);
console.log("$git_config_username="+process.env.git_config_username);
console.log("$git_config_email="+process.env.git_config_email);
console.log("$git_user="+process.env.git_user);
console.log("$git_pwd="+process.env.git_pwd);

console.log("$git_urlcred="+process.env.git_urlcred);
}

fn_init();

console.log("End " + lc_scriptname)

