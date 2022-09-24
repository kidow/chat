window.onUsersnapCXLoad = function (api) {
  api.init()
}
var script = document.createElement('script')
script.defer = 1
script.src =
  'https://widget.usersnap.com/global/load/fa4baa39-53ae-4945-98c8-a4ff79d40498?onload=onUsersnapCXLoad'
document.getElementsByTagName('head')[0].appendChild(script)
