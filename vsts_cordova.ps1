#Set-PSDebug -Trace 1;
# Usage under VSTS project in PowerShell command line
# 1) After 'Get Ressource' task for initialization (variable and git config):
# (New-Object System.Net.WebClient).DownloadFile("https://raw.githubusercontent.com/rlscal/devops/master/vsts_cordova.ps1", "$home\vsts_cordova.ps1");
# Import-Module -Name $home\vsts_cordova.ps1 ;
# fn_gitinit;

# 2) To commmit & push to remote GIT:
# Import-Module -Name $home\vsts_cordova.ps1 ;
# fn_gitcommitpush("your comment")

echo "Start loading vsts_cordova.ps1"
function global:fn_gitinit() {
if (-Not $Env:variables_status) {
fn_get_vsts_variables;
}
fn_display_variables;
if ($Env:git_urlcred) {
echo "remote set-url origin `"$Env:git_urlcred`""; #git remote set-url origin "$Env:git_urlcred" 2>&1 ;
echo "checkout master" ; # git checkout master 2>&1 ;
echo "git show-branch --all"; # git show-branch --all;
echo "git config --global core.autocrlf input"; # git config --global core.autocrlf input 2>&1;
echo "git config --global user.name `"$($Env:git_config_username)`""; # git config --global user.name "$($Env:git_config_username)";
echo "git config --global user.email `"$($Env:git_config_email)`""; # git config --global user.email "$($Env:git_config_email)";
}
else {
echo "ERROR, missing or empty variable `$Env:git_urlcred";
}
}

function global:fn_gitcommitpush([string]$commit_msg) {
if (-Not $Env:variables_status) {
fn_get_vsts_variables;
fn_display_variables;
}
if ($Env:git_urlcred) {
echo "git add -A"; # git add -A 2>&1;
echo "git commit -m `"$commit_msg`""; # git commit -m "$commit_msg" 2>&1;
echo "git push origin master"; # git push origin master 2>&1;
}
else {
echo "ERROR, missing or empty variable `$Env:git_urlcred";
}
}

function global:fn_get_vsts_variables() {
# define Environment variable used by this module
$Env:variables_status="OK";

#$Env:BUILD_REPOSITORY_URI : come from VSTS Get Ressource Task;
if ($Env:BUILD_REPOSITORY_URI) {
$Env:CORDOVA_DEFAULT_VERSION=$(CORDOVA_DEFAULT_VERSION);
$Env:appname=$(appname);
$Env:git_config_email=$(git_config_email); # email for GIT commit under VSTS
$Env:git_config_username=$(git_config_username); # user name for GIT commit under VSTS
$Env:git_pwd=$(git_pwd); # user pwd for git remote access
$Env:git_user=$(git_user); # user login for git remote access

$Env:git_urlcred="https://$Env:git_user:$Env:git_pwd@$($Env:BUILD_REPOSITORY_URI.ToString().SubString(8))";
}
else {
echo "ERROR, missing or empty variable `$Env:BUILD_REPOSITORY_URI";
}
}

function global:fn_display_variables() {
echo "`$Env:BUILD_REPOSITORY_URI=$Env:BUILD_REPOSITORY_URI";
echo "`$Env:CORDOVA_DEFAULT_VERSION=$Env:CORDOVA_DEFAULT_VERSION";
echo "`$Env:appname=$Env:appname";
echo "`$Env:git_config_email=$Env:git_config_email";
echo "`$Env:git_config_username=$Env:git_config_username";
echo "`$Env:git_pwd=$Env:git_pwd";
echo "`$Env:git_user=$Env:git_user";

echo "`$Env:git_urlcred=$Env:git_urlcred";

}
echo "End loading vsts_cordova.ps1"
