window.BENCHMARK_DATA = {
  "lastUpdate": 1787475949497,
  "repoUrl": "https://github.com/flipslidersand-labs/mesh-drop",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "yukihanastudy@gmail.com",
            "name": "flipslidersand",
            "username": "flipslidersand"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "3fd82c3b9b6a791c8500af9e26921bb2b2247873",
          "message": "ci: add benchmark workflow with regression detection (#366) (#445)\n\n* ci: add benchmark workflow with regression detection (#366)\n\nRuns go test -bench on every PR and push to master.\nbenchmark-action stores master results on gh-pages and posts a PR\ncomment with a +20% alert threshold (fail-on-alert: false = warning only).\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\n\n* ci: benchmark workflow に gh-pages 自動初期化ステップを追加\n\ngh-pages ブランチが存在しない初回実行時に benchmark-action が\nfatal エラーで落ちる問題に対処。\n実行前に ls-remote で存在チェックし、未作成なら orphan ブランチを\n作成して push する。\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\n\n---------\n\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T18:03:32+09:00",
          "tree_id": "36b72ee677580083fc89c7657b44c4cdd9776294",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/3fd82c3b9b6a791c8500af9e26921bb2b2247873"
        },
        "date": 1787475948559,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2870,
            "unit": "ns/op\t 356.78 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "419103 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2870,
            "unit": "ns/op",
            "extra": "419103 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 356.78,
            "unit": "MB/s",
            "extra": "419103 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "419103 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "419103 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2865,
            "unit": "ns/op\t 357.47 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "397330 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2865,
            "unit": "ns/op",
            "extra": "397330 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 357.47,
            "unit": "MB/s",
            "extra": "397330 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "397330 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "397330 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2844,
            "unit": "ns/op\t 360.08 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "419595 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2844,
            "unit": "ns/op",
            "extra": "419595 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 360.08,
            "unit": "MB/s",
            "extra": "419595 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "419595 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "419595 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 16969,
            "unit": "ns/op\t 965.51 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "70161 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 16969,
            "unit": "ns/op",
            "extra": "70161 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 965.51,
            "unit": "MB/s",
            "extra": "70161 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "70161 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "70161 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17021,
            "unit": "ns/op\t 962.55 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "70308 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17021,
            "unit": "ns/op",
            "extra": "70308 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 962.55,
            "unit": "MB/s",
            "extra": "70308 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "70308 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "70308 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17155,
            "unit": "ns/op\t 955.04 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "69853 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17155,
            "unit": "ns/op",
            "extra": "69853 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 955.04,
            "unit": "MB/s",
            "extra": "69853 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "69853 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "69853 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 61012,
            "unit": "ns/op\t1074.15 MB/s\t      74 B/op\t       6 allocs/op",
            "extra": "19507 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 61012,
            "unit": "ns/op",
            "extra": "19507 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1074.15,
            "unit": "MB/s",
            "extra": "19507 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 74,
            "unit": "B/op",
            "extra": "19507 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "19507 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 61706,
            "unit": "ns/op\t1062.06 MB/s\t      71 B/op\t       6 allocs/op",
            "extra": "19441 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 61706,
            "unit": "ns/op",
            "extra": "19441 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1062.06,
            "unit": "MB/s",
            "extra": "19441 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 71,
            "unit": "B/op",
            "extra": "19441 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "19441 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 61123,
            "unit": "ns/op\t1072.19 MB/s\t      74 B/op\t       6 allocs/op",
            "extra": "19513 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 61123,
            "unit": "ns/op",
            "extra": "19513 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1072.19,
            "unit": "MB/s",
            "extra": "19513 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 74,
            "unit": "B/op",
            "extra": "19513 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "19513 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 247989,
            "unit": "ns/op\t1057.08 MB/s\t     257 B/op\t      15 allocs/op",
            "extra": "4735 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 247989,
            "unit": "ns/op",
            "extra": "4735 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1057.08,
            "unit": "MB/s",
            "extra": "4735 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 257,
            "unit": "B/op",
            "extra": "4735 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4735 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 248632,
            "unit": "ns/op\t1054.34 MB/s\t     228 B/op\t      15 allocs/op",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 248632,
            "unit": "ns/op",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1054.34,
            "unit": "MB/s",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 228,
            "unit": "B/op",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 248013,
            "unit": "ns/op\t1056.98 MB/s\t     241 B/op\t      15 allocs/op",
            "extra": "4858 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 248013,
            "unit": "ns/op",
            "extra": "4858 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1056.98,
            "unit": "MB/s",
            "extra": "4858 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 241,
            "unit": "B/op",
            "extra": "4858 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4858 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1005797,
            "unit": "ns/op\t1042.53 MB/s\t    1490 B/op\t      51 allocs/op",
            "extra": "1179 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1005797,
            "unit": "ns/op",
            "extra": "1179 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1042.53,
            "unit": "MB/s",
            "extra": "1179 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1490,
            "unit": "B/op",
            "extra": "1179 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1179 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1014248,
            "unit": "ns/op\t1033.85 MB/s\t    1538 B/op\t      51 allocs/op",
            "extra": "1188 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1014248,
            "unit": "ns/op",
            "extra": "1188 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1033.85,
            "unit": "MB/s",
            "extra": "1188 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1538,
            "unit": "B/op",
            "extra": "1188 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1188 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1011754,
            "unit": "ns/op\t1036.39 MB/s\t    1553 B/op\t      51 allocs/op",
            "extra": "1171 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1011754,
            "unit": "ns/op",
            "extra": "1171 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1036.39,
            "unit": "MB/s",
            "extra": "1171 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1553,
            "unit": "B/op",
            "extra": "1171 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1171 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 60956,
            "unit": "ns/op\t1075.14 MB/s\t      67 B/op\t       6 allocs/op",
            "extra": "19293 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 60956,
            "unit": "ns/op",
            "extra": "19293 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1075.14,
            "unit": "MB/s",
            "extra": "19293 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 67,
            "unit": "B/op",
            "extra": "19293 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "19293 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 61704,
            "unit": "ns/op\t1062.11 MB/s\t      70 B/op\t       6 allocs/op",
            "extra": "19519 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 61704,
            "unit": "ns/op",
            "extra": "19519 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1062.11,
            "unit": "MB/s",
            "extra": "19519 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 70,
            "unit": "B/op",
            "extra": "19519 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "19519 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 61024,
            "unit": "ns/op\t1073.93 MB/s\t      67 B/op\t       6 allocs/op",
            "extra": "19414 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 61024,
            "unit": "ns/op",
            "extra": "19414 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1073.93,
            "unit": "MB/s",
            "extra": "19414 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 67,
            "unit": "B/op",
            "extra": "19414 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "19414 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1099091,
            "unit": "ns/op\t   26070 B/op\t     321 allocs/op",
            "extra": "1082 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1099091,
            "unit": "ns/op",
            "extra": "1082 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26070,
            "unit": "B/op",
            "extra": "1082 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1082 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1110012,
            "unit": "ns/op\t   26079 B/op\t     321 allocs/op",
            "extra": "1070 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1110012,
            "unit": "ns/op",
            "extra": "1070 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26079,
            "unit": "B/op",
            "extra": "1070 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1070 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1099656,
            "unit": "ns/op\t   26064 B/op\t     321 allocs/op",
            "extra": "1075 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1099656,
            "unit": "ns/op",
            "extra": "1075 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26064,
            "unit": "B/op",
            "extra": "1075 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1075 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1415,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "766821 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1415,
            "unit": "ns/op",
            "extra": "766821 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "766821 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "766821 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1410,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "790792 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1410,
            "unit": "ns/op",
            "extra": "790792 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "790792 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "790792 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1408,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "795135 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1408,
            "unit": "ns/op",
            "extra": "795135 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "795135 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "795135 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13417,
            "unit": "ns/op\t      38 B/op\t       3 allocs/op",
            "extra": "88988 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13417,
            "unit": "ns/op",
            "extra": "88988 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 38,
            "unit": "B/op",
            "extra": "88988 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "88988 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13326,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "88460 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13326,
            "unit": "ns/op",
            "extra": "88460 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "88460 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "88460 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13334,
            "unit": "ns/op\t      36 B/op\t       3 allocs/op",
            "extra": "88976 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13334,
            "unit": "ns/op",
            "extra": "88976 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 36,
            "unit": "B/op",
            "extra": "88976 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "88976 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53940,
            "unit": "ns/op\t1214.97 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22508 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53940,
            "unit": "ns/op",
            "extra": "22508 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1214.97,
            "unit": "MB/s",
            "extra": "22508 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22508 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22508 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 54040,
            "unit": "ns/op\t1212.73 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22315 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 54040,
            "unit": "ns/op",
            "extra": "22315 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1212.73,
            "unit": "MB/s",
            "extra": "22315 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22315 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22315 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 54208,
            "unit": "ns/op\t1208.96 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22248 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 54208,
            "unit": "ns/op",
            "extra": "22248 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1208.96,
            "unit": "MB/s",
            "extra": "22248 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22248 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22248 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 282260,
            "unit": "ns/op\t3714.93 MB/s\t   48626 B/op\t     175 allocs/op",
            "extra": "4275 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 282260,
            "unit": "ns/op",
            "extra": "4275 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3714.93,
            "unit": "MB/s",
            "extra": "4275 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48626,
            "unit": "B/op",
            "extra": "4275 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4275 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 281415,
            "unit": "ns/op\t3726.08 MB/s\t   48626 B/op\t     175 allocs/op",
            "extra": "4350 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 281415,
            "unit": "ns/op",
            "extra": "4350 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3726.08,
            "unit": "MB/s",
            "extra": "4350 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48626,
            "unit": "B/op",
            "extra": "4350 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4350 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 278883,
            "unit": "ns/op\t3759.92 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "4322 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 278883,
            "unit": "ns/op",
            "extra": "4322 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3759.92,
            "unit": "MB/s",
            "extra": "4322 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "4322 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4322 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3319446,
            "unit": "ns/op\t5054.22 MB/s\t  179930 B/op\t    2115 allocs/op",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3319446,
            "unit": "ns/op",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5054.22,
            "unit": "MB/s",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179930,
            "unit": "B/op",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3736044,
            "unit": "ns/op\t4490.64 MB/s\t  179933 B/op\t    2115 allocs/op",
            "extra": "354 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3736044,
            "unit": "ns/op",
            "extra": "354 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4490.64,
            "unit": "MB/s",
            "extra": "354 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179933,
            "unit": "B/op",
            "extra": "354 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "354 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3346266,
            "unit": "ns/op\t5013.71 MB/s\t  179923 B/op\t    2115 allocs/op",
            "extra": "342 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3346266,
            "unit": "ns/op",
            "extra": "342 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5013.71,
            "unit": "MB/s",
            "extra": "342 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179923,
            "unit": "B/op",
            "extra": "342 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "342 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1063,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1063,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1064,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1064,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1076,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1076,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 457,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2608722 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 457,
            "unit": "ns/op",
            "extra": "2608722 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2608722 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2608722 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 453.9,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2622651 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 453.9,
            "unit": "ns/op",
            "extra": "2622651 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2622651 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2622651 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 451.8,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2646625 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 451.8,
            "unit": "ns/op",
            "extra": "2646625 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2646625 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2646625 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1481,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "763720 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1481,
            "unit": "ns/op",
            "extra": "763720 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "763720 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "763720 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1477,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "771632 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1477,
            "unit": "ns/op",
            "extra": "771632 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "771632 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "771632 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1476,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "767474 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1476,
            "unit": "ns/op",
            "extra": "767474 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "767474 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "767474 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1298582,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "955 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1298582,
            "unit": "ns/op",
            "extra": "955 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "955 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "955 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1301456,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "918 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1301456,
            "unit": "ns/op",
            "extra": "918 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "918 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "918 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1310551,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "909 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1310551,
            "unit": "ns/op",
            "extra": "909 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "909 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "909 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 286.5,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4214672 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 286.5,
            "unit": "ns/op",
            "extra": "4214672 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4214672 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4214672 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 286.5,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4200997 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 286.5,
            "unit": "ns/op",
            "extra": "4200997 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4200997 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4200997 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 285.7,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4176530 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 285.7,
            "unit": "ns/op",
            "extra": "4176530 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4176530 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4176530 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 49.24,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24587562 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 49.24,
            "unit": "ns/op",
            "extra": "24587562 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24587562 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24587562 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 49.05,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24792450 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 49.05,
            "unit": "ns/op",
            "extra": "24792450 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24792450 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24792450 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 49.11,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "23789908 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 49.11,
            "unit": "ns/op",
            "extra": "23789908 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "23789908 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "23789908 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 86.29,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "14469888 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 86.29,
            "unit": "ns/op",
            "extra": "14469888 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "14469888 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "14469888 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 86,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "13708531 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 86,
            "unit": "ns/op",
            "extra": "13708531 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "13708531 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "13708531 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 85.32,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "14178216 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 85.32,
            "unit": "ns/op",
            "extra": "14178216 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "14178216 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "14178216 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 153.5,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7857364 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 153.5,
            "unit": "ns/op",
            "extra": "7857364 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7857364 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7857364 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 154.5,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7697763 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 154.5,
            "unit": "ns/op",
            "extra": "7697763 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7697763 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7697763 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 156.7,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7666202 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 156.7,
            "unit": "ns/op",
            "extra": "7666202 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7666202 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7666202 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 596.7,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2012480 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 596.7,
            "unit": "ns/op",
            "extra": "2012480 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2012480 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2012480 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 600.2,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2025462 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 600.2,
            "unit": "ns/op",
            "extra": "2025462 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2025462 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2025462 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 616.7,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2006850 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 616.7,
            "unit": "ns/op",
            "extra": "2006850 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2006850 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2006850 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 744014,
            "unit": "ns/op\t  38.54 MB/s\t 2347063 B/op\t      48 allocs/op",
            "extra": "1622 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 744014,
            "unit": "ns/op",
            "extra": "1622 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 38.54,
            "unit": "MB/s",
            "extra": "1622 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347063,
            "unit": "B/op",
            "extra": "1622 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1622 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 730464,
            "unit": "ns/op\t  39.25 MB/s\t 2347067 B/op\t      48 allocs/op",
            "extra": "1617 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 730464,
            "unit": "ns/op",
            "extra": "1617 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 39.25,
            "unit": "MB/s",
            "extra": "1617 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347067,
            "unit": "B/op",
            "extra": "1617 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1617 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 743527,
            "unit": "ns/op\t  38.56 MB/s\t 2347065 B/op\t      48 allocs/op",
            "extra": "1556 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 743527,
            "unit": "ns/op",
            "extra": "1556 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 38.56,
            "unit": "MB/s",
            "extra": "1556 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347065,
            "unit": "B/op",
            "extra": "1556 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1556 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1875128,
            "unit": "ns/op\t 559.20 MB/s\t 5241155 B/op\t      28 allocs/op",
            "extra": "579 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1875128,
            "unit": "ns/op",
            "extra": "579 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 559.2,
            "unit": "MB/s",
            "extra": "579 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241155,
            "unit": "B/op",
            "extra": "579 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "579 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1786184,
            "unit": "ns/op\t 587.05 MB/s\t 5241148 B/op\t      28 allocs/op",
            "extra": "698 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1786184,
            "unit": "ns/op",
            "extra": "698 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 587.05,
            "unit": "MB/s",
            "extra": "698 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241148,
            "unit": "B/op",
            "extra": "698 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "698 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1884997,
            "unit": "ns/op\t 556.27 MB/s\t 5241149 B/op\t      28 allocs/op",
            "extra": "645 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1884997,
            "unit": "ns/op",
            "extra": "645 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 556.27,
            "unit": "MB/s",
            "extra": "645 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241149,
            "unit": "B/op",
            "extra": "645 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "645 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1909746,
            "unit": "ns/op\t 549.07 MB/s\t 5241199 B/op\t      29 allocs/op",
            "extra": "651 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1909746,
            "unit": "ns/op",
            "extra": "651 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 549.07,
            "unit": "MB/s",
            "extra": "651 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241199,
            "unit": "B/op",
            "extra": "651 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "651 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1775127,
            "unit": "ns/op\t 590.70 MB/s\t 5241196 B/op\t      29 allocs/op",
            "extra": "679 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1775127,
            "unit": "ns/op",
            "extra": "679 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 590.7,
            "unit": "MB/s",
            "extra": "679 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241196,
            "unit": "B/op",
            "extra": "679 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "679 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1842970,
            "unit": "ns/op\t 568.96 MB/s\t 5241195 B/op\t      29 allocs/op",
            "extra": "630 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1842970,
            "unit": "ns/op",
            "extra": "630 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 568.96,
            "unit": "MB/s",
            "extra": "630 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241195,
            "unit": "B/op",
            "extra": "630 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "630 times\n4 procs"
          }
        ]
      }
    ]
  }
}