package main

import "github.com/spf13/cobra"

// applyDefault は、フラグ flag がコマンドラインで指定されておらず、config.yaml の値 v が
// ゼロ値でないときだけ *dst を v で上書きする。
// 設定項目ごとに「未指定なら config.yaml で補完」を手書きすると書き忘れを検出できないため、
// PreRunE ではこのヘルパー経由に統一する (#635)。
func applyDefault[T comparable](cmd *cobra.Command, flag string, dst *T, v T) {
	var zero T
	if !cmd.Flags().Changed(flag) && v != zero {
		*dst = v
	}
}
