@echo off
setlocal enableDelayedExpansion
set prefix="Hong_"
set counter=1

for %%f in (*.png) do (
	set "pad=00!counter!"
	set "padded=!pad:~-3!"
    set filename=%%~nf
	
	echo "renaming %%f to !prefix!!padded!"
	
    ren "%%f" "!prefix!!padded!.png"
	
	set /a counter+=1
)