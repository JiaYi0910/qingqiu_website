# 青丘地圖：KadoKado 每天下午兩點上架後，把新章節的編號補進網站，推上 GitHub。
# GitHub 的排程常常晚好幾個小時才跑，所以改由這台電腦的「工作排程器」每天 14:05、14:40 執行
# （工作名稱：青丘地圖 KadoKado 章節更新；電腦那時沒開，開機後會補跑一次）。
#
# 它在獨立的資料夾裡跑：%USERPROFILE%\.qingqiu-kado\qingqiu_website（只給排程用，每次都先換成 GitHub 上的最新版），
# 所以不會動到桌面上正在改的網站。執行紀錄寫在 %USERPROFILE%\.qingqiu-kado\log.txt。
# 想手動跑一次：在工作排程器裡對這個工作按「執行」。

[Console]::OutputEncoding = [Text.Encoding]::UTF8  # node 和 git 印出來的中文才不會變亂碼
$env:GIT_TERMINAL_PROMPT = '0'                      # 需要密碼時直接失敗，不會卡住等人輸入
$env:GCM_INTERACTIVE = 'never'

$repo = Split-Path $PSScriptRoot -Parent
$log = Join-Path $env:USERPROFILE '.qingqiu-kado\log.txt'
$node = 'C:\Program Files\nodejs\node.exe'
$git = 'C:\Program Files\Git\cmd\git.exe'

function Log($msg) {
  Add-Content -Path $log -Encoding UTF8 -Value ('{0}  {1}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm'), $msg)
}
function Run($exe, [string[]]$arguments) {
  $lines = & $exe @arguments 2>&1 | ForEach-Object { "$_" }
  foreach ($l in $lines) { if ($l) { Log "  $l" } }
  return $LASTEXITCODE
}

Set-Location $repo
Log '開始'

# 換成 GitHub 上的最新版（這個資料夾只給排程用，沒有要保留的東西）
if ((Run $git @('fetch', '-q', 'origin')) -ne 0) { Log '連不上 GitHub，這次先不更新'; exit 1 }
Run $git @('reset', '-q', '--hard', 'origin/main') | Out-Null

# update_kado.mjs 會把提交說明寫在 RUNNER_TEMP\kado-msg.txt
$env:RUNNER_TEMP = $env:TEMP
$msgFile = Join-Path $env:TEMP 'kado-msg.txt'
Remove-Item $msgFile -ErrorAction SilentlyContinue
if ((Run $node @('tools/update_kado.mjs')) -ne 0) { Log 'KadoKado 沒回應，這次先不更新'; exit 1 }

if (-not (& $git status --porcelain js/data/chapters.js)) { Log '沒有新章節'; exit 0 }
Run $git @('add', 'js/data/chapters.js') | Out-Null
Run $git @('commit', '-q', '-F', $msgFile) | Out-Null
if ((Run $git @('push', '-q', 'origin', 'HEAD:main')) -ne 0) { Log '推不上去，下次再試'; exit 1 }
Log '已推上網站'
