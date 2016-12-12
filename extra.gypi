{
	"conditions": [
		[ "asmjs==1", {
			"ldflags": [
				"--memory-init-file", "0",
				"-s", "TOTAL_MEMORY=134217728"
			]
		} ]
	]
}
