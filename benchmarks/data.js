window.BENCHMARK_DATA = {
  "lastUpdate": 1787481000790,
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
      },
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
          "id": "c4aaa193c526b71d78079fbaf484af762f3a95bb",
          "message": "ci: add Windows build and test job (#371) (#446)\n\n* ci: add Windows build and test job (#371)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\n\n* ci: skip Unix-specific tests on Windows (permissions, path separators)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\n\n---------\n\nCo-authored-by: flipslidersand <yukihanashopping0212@gmail.com>\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T18:21:56+09:00",
          "tree_id": "e340d65736e9af08ccb9a55a6c54892f3f1ce9ef",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/c4aaa193c526b71d78079fbaf484af762f3a95bb"
        },
        "date": 1787477053789,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3120,
            "unit": "ns/op\t 328.18 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "398211 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3120,
            "unit": "ns/op",
            "extra": "398211 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 328.18,
            "unit": "MB/s",
            "extra": "398211 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "398211 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "398211 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2925,
            "unit": "ns/op\t 350.09 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "388828 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2925,
            "unit": "ns/op",
            "extra": "388828 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 350.09,
            "unit": "MB/s",
            "extra": "388828 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "388828 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "388828 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2926,
            "unit": "ns/op\t 349.99 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "400886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2926,
            "unit": "ns/op",
            "extra": "400886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 349.99,
            "unit": "MB/s",
            "extra": "400886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "400886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "400886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17294,
            "unit": "ns/op\t 947.37 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "69212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17294,
            "unit": "ns/op",
            "extra": "69212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 947.37,
            "unit": "MB/s",
            "extra": "69212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "69212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "69212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17308,
            "unit": "ns/op\t 946.62 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "69175 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17308,
            "unit": "ns/op",
            "extra": "69175 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 946.62,
            "unit": "MB/s",
            "extra": "69175 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "69175 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "69175 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17317,
            "unit": "ns/op\t 946.13 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "69048 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17317,
            "unit": "ns/op",
            "extra": "69048 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 946.13,
            "unit": "MB/s",
            "extra": "69048 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "69048 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "69048 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 63856,
            "unit": "ns/op\t1026.30 MB/s\t      75 B/op\t       6 allocs/op",
            "extra": "18775 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 63856,
            "unit": "ns/op",
            "extra": "18775 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1026.3,
            "unit": "MB/s",
            "extra": "18775 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 75,
            "unit": "B/op",
            "extra": "18775 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18775 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 64206,
            "unit": "ns/op\t1020.72 MB/s\t      78 B/op\t       6 allocs/op",
            "extra": "18734 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 64206,
            "unit": "ns/op",
            "extra": "18734 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1020.72,
            "unit": "MB/s",
            "extra": "18734 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 78,
            "unit": "B/op",
            "extra": "18734 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18734 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 64079,
            "unit": "ns/op\t1022.74 MB/s\t      78 B/op\t       6 allocs/op",
            "extra": "18805 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 64079,
            "unit": "ns/op",
            "extra": "18805 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1022.74,
            "unit": "MB/s",
            "extra": "18805 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 78,
            "unit": "B/op",
            "extra": "18805 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18805 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 251054,
            "unit": "ns/op\t1044.17 MB/s\t     256 B/op\t      15 allocs/op",
            "extra": "4791 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 251054,
            "unit": "ns/op",
            "extra": "4791 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1044.17,
            "unit": "MB/s",
            "extra": "4791 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "4791 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4791 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 251140,
            "unit": "ns/op\t1043.82 MB/s\t     231 B/op\t      15 allocs/op",
            "extra": "4628 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 251140,
            "unit": "ns/op",
            "extra": "4628 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1043.82,
            "unit": "MB/s",
            "extra": "4628 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 231,
            "unit": "B/op",
            "extra": "4628 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4628 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 251619,
            "unit": "ns/op\t1041.83 MB/s\t     230 B/op\t      15 allocs/op",
            "extra": "4687 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 251619,
            "unit": "ns/op",
            "extra": "4687 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1041.83,
            "unit": "MB/s",
            "extra": "4687 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 230,
            "unit": "B/op",
            "extra": "4687 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4687 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1041672,
            "unit": "ns/op\t1006.63 MB/s\t    1563 B/op\t      51 allocs/op",
            "extra": "1160 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1041672,
            "unit": "ns/op",
            "extra": "1160 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1006.63,
            "unit": "MB/s",
            "extra": "1160 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1563,
            "unit": "B/op",
            "extra": "1160 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1160 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1035927,
            "unit": "ns/op\t1012.21 MB/s\t    1562 B/op\t      51 allocs/op",
            "extra": "1160 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1035927,
            "unit": "ns/op",
            "extra": "1160 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1012.21,
            "unit": "MB/s",
            "extra": "1160 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1562,
            "unit": "B/op",
            "extra": "1160 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1160 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1034167,
            "unit": "ns/op\t1013.93 MB/s\t    1575 B/op\t      51 allocs/op",
            "extra": "1146 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1034167,
            "unit": "ns/op",
            "extra": "1146 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1013.93,
            "unit": "MB/s",
            "extra": "1146 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1575,
            "unit": "B/op",
            "extra": "1146 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1146 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 64087,
            "unit": "ns/op\t1022.62 MB/s\t      78 B/op\t       6 allocs/op",
            "extra": "18736 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 64087,
            "unit": "ns/op",
            "extra": "18736 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1022.62,
            "unit": "MB/s",
            "extra": "18736 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 78,
            "unit": "B/op",
            "extra": "18736 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18736 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 63982,
            "unit": "ns/op\t1024.29 MB/s\t      81 B/op\t       6 allocs/op",
            "extra": "18742 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 63982,
            "unit": "ns/op",
            "extra": "18742 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1024.29,
            "unit": "MB/s",
            "extra": "18742 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 81,
            "unit": "B/op",
            "extra": "18742 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18742 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 63816,
            "unit": "ns/op\t1026.96 MB/s\t      64 B/op\t       6 allocs/op",
            "extra": "18687 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 63816,
            "unit": "ns/op",
            "extra": "18687 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1026.96,
            "unit": "MB/s",
            "extra": "18687 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "18687 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18687 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1100742,
            "unit": "ns/op\t   26089 B/op\t     321 allocs/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1100742,
            "unit": "ns/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26089,
            "unit": "B/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1100923,
            "unit": "ns/op\t   26074 B/op\t     321 allocs/op",
            "extra": "1075 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1100923,
            "unit": "ns/op",
            "extra": "1075 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26074,
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
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1102202,
            "unit": "ns/op\t   26078 B/op\t     321 allocs/op",
            "extra": "1064 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1102202,
            "unit": "ns/op",
            "extra": "1064 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26078,
            "unit": "B/op",
            "extra": "1064 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1064 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1413,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "787984 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1413,
            "unit": "ns/op",
            "extra": "787984 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "787984 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "787984 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1416,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "798811 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1416,
            "unit": "ns/op",
            "extra": "798811 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "798811 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "798811 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1412,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "780613 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1412,
            "unit": "ns/op",
            "extra": "780613 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "780613 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "780613 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13257,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "89335 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13257,
            "unit": "ns/op",
            "extra": "89335 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "89335 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "89335 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13264,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "85702 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13264,
            "unit": "ns/op",
            "extra": "85702 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "85702 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "85702 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13309,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "88960 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13309,
            "unit": "ns/op",
            "extra": "88960 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "88960 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "88960 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 52684,
            "unit": "ns/op\t1243.96 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22806 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 52684,
            "unit": "ns/op",
            "extra": "22806 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1243.96,
            "unit": "MB/s",
            "extra": "22806 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22806 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22806 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53149,
            "unit": "ns/op\t1233.07 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "20826 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53149,
            "unit": "ns/op",
            "extra": "20826 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1233.07,
            "unit": "MB/s",
            "extra": "20826 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "20826 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "20826 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 52629,
            "unit": "ns/op\t1245.24 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22701 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 52629,
            "unit": "ns/op",
            "extra": "22701 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1245.24,
            "unit": "MB/s",
            "extra": "22701 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22701 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22701 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 275721,
            "unit": "ns/op\t3803.04 MB/s\t   48625 B/op\t     175 allocs/op",
            "extra": "4276 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 275721,
            "unit": "ns/op",
            "extra": "4276 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3803.04,
            "unit": "MB/s",
            "extra": "4276 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48625,
            "unit": "B/op",
            "extra": "4276 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4276 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 277266,
            "unit": "ns/op\t3781.84 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "4272 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 277266,
            "unit": "ns/op",
            "extra": "4272 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3781.84,
            "unit": "MB/s",
            "extra": "4272 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "4272 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4272 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 280296,
            "unit": "ns/op\t3740.96 MB/s\t   48626 B/op\t     175 allocs/op",
            "extra": "4327 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 280296,
            "unit": "ns/op",
            "extra": "4327 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3740.96,
            "unit": "MB/s",
            "extra": "4327 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48626,
            "unit": "B/op",
            "extra": "4327 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4327 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3300036,
            "unit": "ns/op\t5083.95 MB/s\t  179940 B/op\t    2115 allocs/op",
            "extra": "340 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3300036,
            "unit": "ns/op",
            "extra": "340 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5083.95,
            "unit": "MB/s",
            "extra": "340 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179940,
            "unit": "B/op",
            "extra": "340 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "340 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3311555,
            "unit": "ns/op\t5066.27 MB/s\t  179928 B/op\t    2115 allocs/op",
            "extra": "361 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3311555,
            "unit": "ns/op",
            "extra": "361 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5066.27,
            "unit": "MB/s",
            "extra": "361 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179928,
            "unit": "B/op",
            "extra": "361 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "361 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3299605,
            "unit": "ns/op\t5084.61 MB/s\t  179920 B/op\t    2115 allocs/op",
            "extra": "363 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3299605,
            "unit": "ns/op",
            "extra": "363 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5084.61,
            "unit": "MB/s",
            "extra": "363 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179920,
            "unit": "B/op",
            "extra": "363 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "363 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 930.9,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1290668 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 930.9,
            "unit": "ns/op",
            "extra": "1290668 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1290668 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1290668 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 929.4,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1251820 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 929.4,
            "unit": "ns/op",
            "extra": "1251820 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1251820 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1251820 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 940.9,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1276342 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 940.9,
            "unit": "ns/op",
            "extra": "1276342 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1276342 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1276342 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 451.5,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2657546 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 451.5,
            "unit": "ns/op",
            "extra": "2657546 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2657546 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2657546 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 450.3,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2656692 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 450.3,
            "unit": "ns/op",
            "extra": "2656692 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2656692 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2656692 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 450.5,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2664861 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 450.5,
            "unit": "ns/op",
            "extra": "2664861 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2664861 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2664861 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1494,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "755005 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1494,
            "unit": "ns/op",
            "extra": "755005 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "755005 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "755005 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1489,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "746271 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1489,
            "unit": "ns/op",
            "extra": "746271 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "746271 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "746271 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1486,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "751285 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1486,
            "unit": "ns/op",
            "extra": "751285 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "751285 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "751285 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1309146,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "922 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1309146,
            "unit": "ns/op",
            "extra": "922 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "922 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "922 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1281763,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "932 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1281763,
            "unit": "ns/op",
            "extra": "932 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "932 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "932 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1287174,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "938 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1287174,
            "unit": "ns/op",
            "extra": "938 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "938 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "938 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 279,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4282359 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 279,
            "unit": "ns/op",
            "extra": "4282359 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4282359 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4282359 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 278.6,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4304794 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 278.6,
            "unit": "ns/op",
            "extra": "4304794 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4304794 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4304794 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 280,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4298974 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 280,
            "unit": "ns/op",
            "extra": "4298974 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4298974 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4298974 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45.27,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "26505247 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45.27,
            "unit": "ns/op",
            "extra": "26505247 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "26505247 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "26505247 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45.1,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "26030071 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45.1,
            "unit": "ns/op",
            "extra": "26030071 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "26030071 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "26030071 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 44.94,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "27007872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 44.94,
            "unit": "ns/op",
            "extra": "27007872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "27007872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "27007872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 77.14,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "14565423 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 77.14,
            "unit": "ns/op",
            "extra": "14565423 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "14565423 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "14565423 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 76.91,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "16164876 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 76.91,
            "unit": "ns/op",
            "extra": "16164876 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "16164876 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "16164876 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 76.7,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "15426003 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 76.7,
            "unit": "ns/op",
            "extra": "15426003 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "15426003 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "15426003 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 133.9,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "8799198 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 133.9,
            "unit": "ns/op",
            "extra": "8799198 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "8799198 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "8799198 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 133.9,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "8739066 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 133.9,
            "unit": "ns/op",
            "extra": "8739066 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "8739066 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "8739066 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 133.9,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "9174636 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 133.9,
            "unit": "ns/op",
            "extra": "9174636 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "9174636 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "9174636 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 516.5,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2327139 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 516.5,
            "unit": "ns/op",
            "extra": "2327139 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2327139 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2327139 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 512.7,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2387757 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 512.7,
            "unit": "ns/op",
            "extra": "2387757 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2387757 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2387757 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 512.3,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2346086 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 512.3,
            "unit": "ns/op",
            "extra": "2346086 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2346086 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2346086 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 567098,
            "unit": "ns/op\t  50.56 MB/s\t 2347063 B/op\t      48 allocs/op",
            "extra": "2418 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 567098,
            "unit": "ns/op",
            "extra": "2418 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 50.56,
            "unit": "MB/s",
            "extra": "2418 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347063,
            "unit": "B/op",
            "extra": "2418 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "2418 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 738017,
            "unit": "ns/op\t  38.85 MB/s\t 2347065 B/op\t      48 allocs/op",
            "extra": "1748 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 738017,
            "unit": "ns/op",
            "extra": "1748 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 38.85,
            "unit": "MB/s",
            "extra": "1748 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347065,
            "unit": "B/op",
            "extra": "1748 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1748 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 793044,
            "unit": "ns/op\t  36.15 MB/s\t 2347067 B/op\t      48 allocs/op",
            "extra": "1426 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 793044,
            "unit": "ns/op",
            "extra": "1426 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 36.15,
            "unit": "MB/s",
            "extra": "1426 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347067,
            "unit": "B/op",
            "extra": "1426 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1426 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1910289,
            "unit": "ns/op\t 548.91 MB/s\t 5241149 B/op\t      28 allocs/op",
            "extra": "618 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1910289,
            "unit": "ns/op",
            "extra": "618 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 548.91,
            "unit": "MB/s",
            "extra": "618 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241149,
            "unit": "B/op",
            "extra": "618 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "618 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1856371,
            "unit": "ns/op\t 564.85 MB/s\t 5241147 B/op\t      28 allocs/op",
            "extra": "609 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1856371,
            "unit": "ns/op",
            "extra": "609 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 564.85,
            "unit": "MB/s",
            "extra": "609 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241147,
            "unit": "B/op",
            "extra": "609 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "609 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1960913,
            "unit": "ns/op\t 534.74 MB/s\t 5241149 B/op\t      28 allocs/op",
            "extra": "708 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1960913,
            "unit": "ns/op",
            "extra": "708 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 534.74,
            "unit": "MB/s",
            "extra": "708 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241149,
            "unit": "B/op",
            "extra": "708 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "708 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1961833,
            "unit": "ns/op\t 534.49 MB/s\t 5241203 B/op\t      29 allocs/op",
            "extra": "567 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1961833,
            "unit": "ns/op",
            "extra": "567 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 534.49,
            "unit": "MB/s",
            "extra": "567 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241203,
            "unit": "B/op",
            "extra": "567 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "567 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1699126,
            "unit": "ns/op\t 617.13 MB/s\t 5241198 B/op\t      29 allocs/op",
            "extra": "676 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1699126,
            "unit": "ns/op",
            "extra": "676 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 617.13,
            "unit": "MB/s",
            "extra": "676 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241198,
            "unit": "B/op",
            "extra": "676 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "676 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1747081,
            "unit": "ns/op\t 600.19 MB/s\t 5241198 B/op\t      29 allocs/op",
            "extra": "800 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1747081,
            "unit": "ns/op",
            "extra": "800 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 600.19,
            "unit": "MB/s",
            "extra": "800 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241198,
            "unit": "B/op",
            "extra": "800 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "800 times\n4 procs"
          }
        ]
      },
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
          "id": "645b7e61f8f3ba01219ff0340b5fe656d41e3373",
          "message": "test(webui): add handleSend 413 and Content-Disposition tests (#264, #265) (#447)\n\n* test(webui): add handleSend 413 and Content-Disposition tests (#264, #265)\n\n- TestHandleSend_BodyExceedsLimit_Returns413: verifies 413 when body exceeds 512 MiB\n- TestHandleSend_SmallBody_NotRejected: small body must not trigger 413\n- TestHandleDownload_SafeFilename_Unmodified: plain ASCII filename passes through as-is\n- TestHandleDownload_FilenameWithQuotes_Escaped: double-quote in filename is RFC-escaped\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\n\n* fix(webui): check mw.Close() error return to satisfy errcheck linter\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\n\n---------\n\nCo-authored-by: flipslidersand <yukihanashopping0212@gmail.com>\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T18:22:00+09:00",
          "tree_id": "4ebb752c8878ea085bcb106b5d278027473aef26",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/645b7e61f8f3ba01219ff0340b5fe656d41e3373"
        },
        "date": 1787477060162,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3196,
            "unit": "ns/op\t 320.43 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "386000 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3196,
            "unit": "ns/op",
            "extra": "386000 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 320.43,
            "unit": "MB/s",
            "extra": "386000 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "386000 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "386000 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3154,
            "unit": "ns/op\t 324.66 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "379033 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3154,
            "unit": "ns/op",
            "extra": "379033 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 324.66,
            "unit": "MB/s",
            "extra": "379033 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "379033 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "379033 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3120,
            "unit": "ns/op\t 328.24 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "384144 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3120,
            "unit": "ns/op",
            "extra": "384144 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 328.24,
            "unit": "MB/s",
            "extra": "384144 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "384144 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "384144 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21296,
            "unit": "ns/op\t 769.34 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "56472 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21296,
            "unit": "ns/op",
            "extra": "56472 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 769.34,
            "unit": "MB/s",
            "extra": "56472 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "56472 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "56472 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21287,
            "unit": "ns/op\t 769.67 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "56017 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21287,
            "unit": "ns/op",
            "extra": "56017 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 769.67,
            "unit": "MB/s",
            "extra": "56017 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "56017 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "56017 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21074,
            "unit": "ns/op\t 777.46 MB/s\t      35 B/op\t       3 allocs/op",
            "extra": "56944 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21074,
            "unit": "ns/op",
            "extra": "56944 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 777.46,
            "unit": "MB/s",
            "extra": "56944 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 35,
            "unit": "B/op",
            "extra": "56944 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "56944 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 74008,
            "unit": "ns/op\t 885.53 MB/s\t      77 B/op\t       6 allocs/op",
            "extra": "15802 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 74008,
            "unit": "ns/op",
            "extra": "15802 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 885.53,
            "unit": "MB/s",
            "extra": "15802 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 77,
            "unit": "B/op",
            "extra": "15802 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15802 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75734,
            "unit": "ns/op\t 865.34 MB/s\t      76 B/op\t       6 allocs/op",
            "extra": "15848 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75734,
            "unit": "ns/op",
            "extra": "15848 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 865.34,
            "unit": "MB/s",
            "extra": "15848 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 76,
            "unit": "B/op",
            "extra": "15848 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15848 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 76346,
            "unit": "ns/op\t 858.41 MB/s\t      80 B/op\t       6 allocs/op",
            "extra": "16182 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 76346,
            "unit": "ns/op",
            "extra": "16182 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 858.41,
            "unit": "MB/s",
            "extra": "16182 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 80,
            "unit": "B/op",
            "extra": "16182 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "16182 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 247734,
            "unit": "ns/op\t1058.17 MB/s\t     242 B/op\t      15 allocs/op",
            "extra": "4819 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 247734,
            "unit": "ns/op",
            "extra": "4819 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1058.17,
            "unit": "MB/s",
            "extra": "4819 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 242,
            "unit": "B/op",
            "extra": "4819 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4819 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 247251,
            "unit": "ns/op\t1060.23 MB/s\t     228 B/op\t      15 allocs/op",
            "extra": "4803 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 247251,
            "unit": "ns/op",
            "extra": "4803 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1060.23,
            "unit": "MB/s",
            "extra": "4803 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 228,
            "unit": "B/op",
            "extra": "4803 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4803 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 245986,
            "unit": "ns/op\t1065.69 MB/s\t     215 B/op\t      15 allocs/op",
            "extra": "4778 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 245986,
            "unit": "ns/op",
            "extra": "4778 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1065.69,
            "unit": "MB/s",
            "extra": "4778 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 215,
            "unit": "B/op",
            "extra": "4778 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4778 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 943532,
            "unit": "ns/op\t1111.33 MB/s\t    1490 B/op\t      51 allocs/op",
            "extra": "1248 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 943532,
            "unit": "ns/op",
            "extra": "1248 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1111.33,
            "unit": "MB/s",
            "extra": "1248 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1490,
            "unit": "B/op",
            "extra": "1248 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1248 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 946872,
            "unit": "ns/op\t1107.41 MB/s\t    1526 B/op\t      51 allocs/op",
            "extra": "1269 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 946872,
            "unit": "ns/op",
            "extra": "1269 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1107.41,
            "unit": "MB/s",
            "extra": "1269 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1526,
            "unit": "B/op",
            "extra": "1269 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1269 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 948372,
            "unit": "ns/op\t1105.66 MB/s\t    1532 B/op\t      51 allocs/op",
            "extra": "1195 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 948372,
            "unit": "ns/op",
            "extra": "1195 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1105.66,
            "unit": "MB/s",
            "extra": "1195 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1532,
            "unit": "B/op",
            "extra": "1195 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1195 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75011,
            "unit": "ns/op\t 873.69 MB/s\t      72 B/op\t       6 allocs/op",
            "extra": "16050 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75011,
            "unit": "ns/op",
            "extra": "16050 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 873.69,
            "unit": "MB/s",
            "extra": "16050 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 72,
            "unit": "B/op",
            "extra": "16050 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "16050 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75612,
            "unit": "ns/op\t 866.74 MB/s\t      72 B/op\t       6 allocs/op",
            "extra": "16009 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75612,
            "unit": "ns/op",
            "extra": "16009 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 866.74,
            "unit": "MB/s",
            "extra": "16009 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 72,
            "unit": "B/op",
            "extra": "16009 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "16009 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 76095,
            "unit": "ns/op\t 861.23 MB/s\t      89 B/op\t       6 allocs/op",
            "extra": "15612 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 76095,
            "unit": "ns/op",
            "extra": "15612 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 861.23,
            "unit": "MB/s",
            "extra": "15612 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 89,
            "unit": "B/op",
            "extra": "15612 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15612 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1227649,
            "unit": "ns/op\t   26085 B/op\t     321 allocs/op",
            "extra": "961 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1227649,
            "unit": "ns/op",
            "extra": "961 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26085,
            "unit": "B/op",
            "extra": "961 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "961 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1225668,
            "unit": "ns/op\t   26078 B/op\t     321 allocs/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1225668,
            "unit": "ns/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26078,
            "unit": "B/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "969 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1243123,
            "unit": "ns/op\t   26071 B/op\t     321 allocs/op",
            "extra": "951 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1243123,
            "unit": "ns/op",
            "extra": "951 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26071,
            "unit": "B/op",
            "extra": "951 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "951 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1366,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "758139 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1366,
            "unit": "ns/op",
            "extra": "758139 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "758139 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "758139 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1366,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "790050 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1366,
            "unit": "ns/op",
            "extra": "790050 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "790050 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "790050 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1348,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "787690 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1348,
            "unit": "ns/op",
            "extra": "787690 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "787690 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "787690 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14441,
            "unit": "ns/op\t      38 B/op\t       3 allocs/op",
            "extra": "81888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14441,
            "unit": "ns/op",
            "extra": "81888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 38,
            "unit": "B/op",
            "extra": "81888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "81888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14406,
            "unit": "ns/op\t      39 B/op\t       3 allocs/op",
            "extra": "81652 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14406,
            "unit": "ns/op",
            "extra": "81652 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 39,
            "unit": "B/op",
            "extra": "81652 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "81652 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14417,
            "unit": "ns/op\t      38 B/op\t       3 allocs/op",
            "extra": "81571 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14417,
            "unit": "ns/op",
            "extra": "81571 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 38,
            "unit": "B/op",
            "extra": "81571 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "81571 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53980,
            "unit": "ns/op\t1214.08 MB/s\t   39601 B/op\t      34 allocs/op",
            "extra": "22176 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53980,
            "unit": "ns/op",
            "extra": "22176 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1214.08,
            "unit": "MB/s",
            "extra": "22176 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39601,
            "unit": "B/op",
            "extra": "22176 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22176 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 54205,
            "unit": "ns/op\t1209.05 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22299 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 54205,
            "unit": "ns/op",
            "extra": "22299 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1209.05,
            "unit": "MB/s",
            "extra": "22299 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22299 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22299 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53903,
            "unit": "ns/op\t1215.82 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22134 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53903,
            "unit": "ns/op",
            "extra": "22134 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1215.82,
            "unit": "MB/s",
            "extra": "22134 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22134 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22134 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 287242,
            "unit": "ns/op\t3650.50 MB/s\t   48624 B/op\t     175 allocs/op",
            "extra": "4304 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 287242,
            "unit": "ns/op",
            "extra": "4304 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3650.5,
            "unit": "MB/s",
            "extra": "4304 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48624,
            "unit": "B/op",
            "extra": "4304 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4304 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 287686,
            "unit": "ns/op\t3644.86 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "4076 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 287686,
            "unit": "ns/op",
            "extra": "4076 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3644.86,
            "unit": "MB/s",
            "extra": "4076 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "4076 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4076 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 284842,
            "unit": "ns/op\t3681.26 MB/s\t   48625 B/op\t     175 allocs/op",
            "extra": "4016 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 284842,
            "unit": "ns/op",
            "extra": "4016 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3681.26,
            "unit": "MB/s",
            "extra": "4016 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48625,
            "unit": "B/op",
            "extra": "4016 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4016 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3584126,
            "unit": "ns/op\t4680.98 MB/s\t  179923 B/op\t    2115 allocs/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3584126,
            "unit": "ns/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4680.98,
            "unit": "MB/s",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179923,
            "unit": "B/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "324 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3931981,
            "unit": "ns/op\t4266.86 MB/s\t  179924 B/op\t    2115 allocs/op",
            "extra": "325 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3931981,
            "unit": "ns/op",
            "extra": "325 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4266.86,
            "unit": "MB/s",
            "extra": "325 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179924,
            "unit": "B/op",
            "extra": "325 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "325 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3657276,
            "unit": "ns/op\t4587.35 MB/s\t  179933 B/op\t    2115 allocs/op",
            "extra": "330 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3657276,
            "unit": "ns/op",
            "extra": "330 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4587.35,
            "unit": "MB/s",
            "extra": "330 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179933,
            "unit": "B/op",
            "extra": "330 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "330 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1022,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1169126 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1022,
            "unit": "ns/op",
            "extra": "1169126 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1169126 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1169126 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1041,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1041,
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
            "value": 1033,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1033,
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
            "value": 397.7,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3017383 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 397.7,
            "unit": "ns/op",
            "extra": "3017383 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3017383 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3017383 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 396.8,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3022398 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 396.8,
            "unit": "ns/op",
            "extra": "3022398 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3022398 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3022398 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 396.7,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3042897 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 396.7,
            "unit": "ns/op",
            "extra": "3042897 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3042897 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3042897 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1398,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "777640 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1398,
            "unit": "ns/op",
            "extra": "777640 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "777640 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "777640 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1392,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "811689 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1392,
            "unit": "ns/op",
            "extra": "811689 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "811689 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "811689 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1388,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "789315 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1388,
            "unit": "ns/op",
            "extra": "789315 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "789315 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "789315 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1174913,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "992 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1174913,
            "unit": "ns/op",
            "extra": "992 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "992 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "992 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1174346,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1014 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1174346,
            "unit": "ns/op",
            "extra": "1014 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1014 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1014 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1171574,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1010 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1171574,
            "unit": "ns/op",
            "extra": "1010 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1010 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1010 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 247,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4842128 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 247,
            "unit": "ns/op",
            "extra": "4842128 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4842128 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4842128 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 246.9,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4827498 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 246.9,
            "unit": "ns/op",
            "extra": "4827498 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4827498 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4827498 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 246.9,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4859956 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 246.9,
            "unit": "ns/op",
            "extra": "4859956 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4859956 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4859956 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 49.08,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "22294402 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 49.08,
            "unit": "ns/op",
            "extra": "22294402 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "22294402 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "22294402 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 48.95,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24239883 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 48.95,
            "unit": "ns/op",
            "extra": "24239883 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24239883 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24239883 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 49.67,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "22824871 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 49.67,
            "unit": "ns/op",
            "extra": "22824871 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "22824871 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "22824871 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 84.74,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "13274280 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 84.74,
            "unit": "ns/op",
            "extra": "13274280 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "13274280 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "13274280 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 86.41,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "14114454 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 86.41,
            "unit": "ns/op",
            "extra": "14114454 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "14114454 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "14114454 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 86.61,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "14211001 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 86.61,
            "unit": "ns/op",
            "extra": "14211001 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "14211001 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "14211001 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 158.3,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7627610 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 158.3,
            "unit": "ns/op",
            "extra": "7627610 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7627610 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7627610 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 159.2,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7653937 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 159.2,
            "unit": "ns/op",
            "extra": "7653937 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7653937 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7653937 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 157.9,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7732522 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 157.9,
            "unit": "ns/op",
            "extra": "7732522 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7732522 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7732522 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 597.4,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1971687 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 597.4,
            "unit": "ns/op",
            "extra": "1971687 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1971687 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1971687 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 608.4,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1992484 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 608.4,
            "unit": "ns/op",
            "extra": "1992484 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1992484 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1992484 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 606.6,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1964808 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 606.6,
            "unit": "ns/op",
            "extra": "1964808 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1964808 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1964808 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 792550,
            "unit": "ns/op\t  36.18 MB/s\t 2347063 B/op\t      48 allocs/op",
            "extra": "1447 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 792550,
            "unit": "ns/op",
            "extra": "1447 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 36.18,
            "unit": "MB/s",
            "extra": "1447 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347063,
            "unit": "B/op",
            "extra": "1447 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1447 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 796430,
            "unit": "ns/op\t  36.00 MB/s\t 2347063 B/op\t      48 allocs/op",
            "extra": "1624 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 796430,
            "unit": "ns/op",
            "extra": "1624 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 36,
            "unit": "MB/s",
            "extra": "1624 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347063,
            "unit": "B/op",
            "extra": "1624 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1624 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 789053,
            "unit": "ns/op\t  36.34 MB/s\t 2347064 B/op\t      48 allocs/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 789053,
            "unit": "ns/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 36.34,
            "unit": "MB/s",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347064,
            "unit": "B/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1432 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1805278,
            "unit": "ns/op\t 580.84 MB/s\t 5241145 B/op\t      28 allocs/op",
            "extra": "691 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1805278,
            "unit": "ns/op",
            "extra": "691 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 580.84,
            "unit": "MB/s",
            "extra": "691 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241145,
            "unit": "B/op",
            "extra": "691 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "691 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1942334,
            "unit": "ns/op\t 539.85 MB/s\t 5241144 B/op\t      28 allocs/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1942334,
            "unit": "ns/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 539.85,
            "unit": "MB/s",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241144,
            "unit": "B/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1970727,
            "unit": "ns/op\t 532.08 MB/s\t 5241146 B/op\t      28 allocs/op",
            "extra": "554 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1970727,
            "unit": "ns/op",
            "extra": "554 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 532.08,
            "unit": "MB/s",
            "extra": "554 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241146,
            "unit": "B/op",
            "extra": "554 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "554 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1916641,
            "unit": "ns/op\t 547.09 MB/s\t 5241194 B/op\t      29 allocs/op",
            "extra": "685 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1916641,
            "unit": "ns/op",
            "extra": "685 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 547.09,
            "unit": "MB/s",
            "extra": "685 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241194,
            "unit": "B/op",
            "extra": "685 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "685 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2005201,
            "unit": "ns/op\t 522.93 MB/s\t 5241195 B/op\t      29 allocs/op",
            "extra": "540 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2005201,
            "unit": "ns/op",
            "extra": "540 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 522.93,
            "unit": "MB/s",
            "extra": "540 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241195,
            "unit": "B/op",
            "extra": "540 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "540 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1880985,
            "unit": "ns/op\t 557.46 MB/s\t 5241194 B/op\t      29 allocs/op",
            "extra": "614 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1880985,
            "unit": "ns/op",
            "extra": "614 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 557.46,
            "unit": "MB/s",
            "extra": "614 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241194,
            "unit": "B/op",
            "extra": "614 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "614 times\n4 procs"
          }
        ]
      },
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
          "id": "54bdc1c2a3df55462da4b9ac33a09b9d11583938",
          "message": "feat(transfer): log QUIC+Noise handshake latency at debug level (#273) (#449)\n\nSend/SendNAT で QUIC dial 前後(t0/t1)と Noise XX 完了後(t2)を計測し、\nslog.Debug で quic_dial_ms / noise_xx_ms / total_ms を出力する。\n--verbose や MESHDROP_DEBUG=1 などで debug ログが有効な場合のみ表示。\n\nCo-authored-by: flipslidersand <yukihanashopping0212@gmail.com>\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T18:22:04+09:00",
          "tree_id": "2b7ee9ff57015816c50c40f88fd9054e8d616897",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/54bdc1c2a3df55462da4b9ac33a09b9d11583938"
        },
        "date": 1787477063310,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3056,
            "unit": "ns/op\t 335.03 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "386114 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3056,
            "unit": "ns/op",
            "extra": "386114 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 335.03,
            "unit": "MB/s",
            "extra": "386114 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "386114 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "386114 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3145,
            "unit": "ns/op\t 325.62 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "381421 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3145,
            "unit": "ns/op",
            "extra": "381421 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 325.62,
            "unit": "MB/s",
            "extra": "381421 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "381421 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "381421 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3114,
            "unit": "ns/op\t 328.79 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "383052 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3114,
            "unit": "ns/op",
            "extra": "383052 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 328.79,
            "unit": "MB/s",
            "extra": "383052 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "383052 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "383052 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21177,
            "unit": "ns/op\t 773.67 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "56527 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21177,
            "unit": "ns/op",
            "extra": "56527 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 773.67,
            "unit": "MB/s",
            "extra": "56527 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "56527 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "56527 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21152,
            "unit": "ns/op\t 774.57 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "56433 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21152,
            "unit": "ns/op",
            "extra": "56433 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 774.57,
            "unit": "MB/s",
            "extra": "56433 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "56433 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "56433 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21104,
            "unit": "ns/op\t 776.34 MB/s\t      35 B/op\t       3 allocs/op",
            "extra": "55904 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21104,
            "unit": "ns/op",
            "extra": "55904 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 776.34,
            "unit": "MB/s",
            "extra": "55904 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 35,
            "unit": "B/op",
            "extra": "55904 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "55904 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 76511,
            "unit": "ns/op\t 856.56 MB/s\t      85 B/op\t       6 allocs/op",
            "extra": "15518 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 76511,
            "unit": "ns/op",
            "extra": "15518 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 856.56,
            "unit": "MB/s",
            "extra": "15518 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 85,
            "unit": "B/op",
            "extra": "15518 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15518 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75797,
            "unit": "ns/op\t 864.63 MB/s\t      77 B/op\t       6 allocs/op",
            "extra": "15510 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75797,
            "unit": "ns/op",
            "extra": "15510 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 864.63,
            "unit": "MB/s",
            "extra": "15510 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 77,
            "unit": "B/op",
            "extra": "15510 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15510 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 77055,
            "unit": "ns/op\t 850.51 MB/s\t      85 B/op\t       6 allocs/op",
            "extra": "15801 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 77055,
            "unit": "ns/op",
            "extra": "15801 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 850.51,
            "unit": "MB/s",
            "extra": "15801 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 85,
            "unit": "B/op",
            "extra": "15801 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15801 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 246927,
            "unit": "ns/op\t1061.63 MB/s\t     229 B/op\t      15 allocs/op",
            "extra": "4810 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 246927,
            "unit": "ns/op",
            "extra": "4810 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1061.63,
            "unit": "MB/s",
            "extra": "4810 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 229,
            "unit": "B/op",
            "extra": "4810 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4810 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 248071,
            "unit": "ns/op\t1056.73 MB/s\t     230 B/op\t      15 allocs/op",
            "extra": "4726 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 248071,
            "unit": "ns/op",
            "extra": "4726 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1056.73,
            "unit": "MB/s",
            "extra": "4726 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 230,
            "unit": "B/op",
            "extra": "4726 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4726 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 247802,
            "unit": "ns/op\t1057.88 MB/s\t     229 B/op\t      15 allocs/op",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 247802,
            "unit": "ns/op",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1057.88,
            "unit": "MB/s",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 229,
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
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 961556,
            "unit": "ns/op\t1090.50 MB/s\t    1522 B/op\t      51 allocs/op",
            "extra": "1208 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 961556,
            "unit": "ns/op",
            "extra": "1208 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1090.5,
            "unit": "MB/s",
            "extra": "1208 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1522,
            "unit": "B/op",
            "extra": "1208 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1208 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 954633,
            "unit": "ns/op\t1098.41 MB/s\t    1469 B/op\t      51 allocs/op",
            "extra": "1210 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 954633,
            "unit": "ns/op",
            "extra": "1210 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1098.41,
            "unit": "MB/s",
            "extra": "1210 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1469,
            "unit": "B/op",
            "extra": "1210 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1210 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 990175,
            "unit": "ns/op\t1058.98 MB/s\t    1555 B/op\t      51 allocs/op",
            "extra": "1233 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 990175,
            "unit": "ns/op",
            "extra": "1233 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1058.98,
            "unit": "MB/s",
            "extra": "1233 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1555,
            "unit": "B/op",
            "extra": "1233 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1233 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75894,
            "unit": "ns/op\t 863.52 MB/s\t      72 B/op\t       6 allocs/op",
            "extra": "15613 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75894,
            "unit": "ns/op",
            "extra": "15613 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 863.52,
            "unit": "MB/s",
            "extra": "15613 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 72,
            "unit": "B/op",
            "extra": "15613 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15613 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75698,
            "unit": "ns/op\t 865.75 MB/s\t      72 B/op\t       6 allocs/op",
            "extra": "15570 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75698,
            "unit": "ns/op",
            "extra": "15570 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 865.75,
            "unit": "MB/s",
            "extra": "15570 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 72,
            "unit": "B/op",
            "extra": "15570 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15570 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75482,
            "unit": "ns/op\t 868.24 MB/s\t      68 B/op\t       6 allocs/op",
            "extra": "15778 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75482,
            "unit": "ns/op",
            "extra": "15778 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 868.24,
            "unit": "MB/s",
            "extra": "15778 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 68,
            "unit": "B/op",
            "extra": "15778 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15778 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1230232,
            "unit": "ns/op\t   26094 B/op\t     321 allocs/op",
            "extra": "951 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1230232,
            "unit": "ns/op",
            "extra": "951 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26094,
            "unit": "B/op",
            "extra": "951 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "951 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1280178,
            "unit": "ns/op\t   26069 B/op\t     321 allocs/op",
            "extra": "958 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1280178,
            "unit": "ns/op",
            "extra": "958 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26069,
            "unit": "B/op",
            "extra": "958 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "958 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1242716,
            "unit": "ns/op\t   26066 B/op\t     321 allocs/op",
            "extra": "966 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1242716,
            "unit": "ns/op",
            "extra": "966 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26066,
            "unit": "B/op",
            "extra": "966 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "966 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1376,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "738355 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1376,
            "unit": "ns/op",
            "extra": "738355 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "738355 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "738355 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1392,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "780609 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1392,
            "unit": "ns/op",
            "extra": "780609 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "780609 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "780609 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1369,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "789762 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1369,
            "unit": "ns/op",
            "extra": "789762 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "789762 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "789762 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14513,
            "unit": "ns/op\t      39 B/op\t       3 allocs/op",
            "extra": "81898 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14513,
            "unit": "ns/op",
            "extra": "81898 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 39,
            "unit": "B/op",
            "extra": "81898 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "81898 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14466,
            "unit": "ns/op\t      41 B/op\t       3 allocs/op",
            "extra": "82026 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14466,
            "unit": "ns/op",
            "extra": "82026 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 41,
            "unit": "B/op",
            "extra": "82026 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "82026 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14380,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "81770 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14380,
            "unit": "ns/op",
            "extra": "81770 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "81770 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "81770 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 54244,
            "unit": "ns/op\t1208.17 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "21922 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 54244,
            "unit": "ns/op",
            "extra": "21922 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1208.17,
            "unit": "MB/s",
            "extra": "21922 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "21922 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "21922 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 54531,
            "unit": "ns/op\t1201.81 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22155 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 54531,
            "unit": "ns/op",
            "extra": "22155 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1201.81,
            "unit": "MB/s",
            "extra": "22155 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22155 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22155 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 54150,
            "unit": "ns/op\t1210.27 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22174 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 54150,
            "unit": "ns/op",
            "extra": "22174 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1210.27,
            "unit": "MB/s",
            "extra": "22174 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22174 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22174 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 292422,
            "unit": "ns/op\t3585.83 MB/s\t   48626 B/op\t     175 allocs/op",
            "extra": "4078 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 292422,
            "unit": "ns/op",
            "extra": "4078 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3585.83,
            "unit": "MB/s",
            "extra": "4078 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48626,
            "unit": "B/op",
            "extra": "4078 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4078 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 288256,
            "unit": "ns/op\t3637.65 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "3952 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 288256,
            "unit": "ns/op",
            "extra": "3952 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3637.65,
            "unit": "MB/s",
            "extra": "3952 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "3952 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "3952 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 293975,
            "unit": "ns/op\t3566.89 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "4174 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 293975,
            "unit": "ns/op",
            "extra": "4174 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3566.89,
            "unit": "MB/s",
            "extra": "4174 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "4174 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4174 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 4089238,
            "unit": "ns/op\t4102.77 MB/s\t  179923 B/op\t    2115 allocs/op",
            "extra": "294 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 4089238,
            "unit": "ns/op",
            "extra": "294 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4102.77,
            "unit": "MB/s",
            "extra": "294 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179923,
            "unit": "B/op",
            "extra": "294 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "294 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 4332830,
            "unit": "ns/op\t3872.11 MB/s\t  179920 B/op\t    2115 allocs/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 4332830,
            "unit": "ns/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3872.11,
            "unit": "MB/s",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179920,
            "unit": "B/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "314 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 4307374,
            "unit": "ns/op\t3895.00 MB/s\t  179920 B/op\t    2115 allocs/op",
            "extra": "294 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 4307374,
            "unit": "ns/op",
            "extra": "294 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3895,
            "unit": "MB/s",
            "extra": "294 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179920,
            "unit": "B/op",
            "extra": "294 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "294 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1036,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "981404 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1036,
            "unit": "ns/op",
            "extra": "981404 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "981404 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "981404 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1071,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1071,
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
            "value": 1063,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1115269 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1063,
            "unit": "ns/op",
            "extra": "1115269 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1115269 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1115269 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 395.7,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3032184 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 395.7,
            "unit": "ns/op",
            "extra": "3032184 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3032184 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3032184 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 393.2,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3041018 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 393.2,
            "unit": "ns/op",
            "extra": "3041018 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3041018 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3041018 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 389.7,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3071167 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 389.7,
            "unit": "ns/op",
            "extra": "3071167 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3071167 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3071167 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1372,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "795562 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1372,
            "unit": "ns/op",
            "extra": "795562 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "795562 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "795562 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1376,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "817467 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1376,
            "unit": "ns/op",
            "extra": "817467 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "817467 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "817467 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1385,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "812364 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1385,
            "unit": "ns/op",
            "extra": "812364 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "812364 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "812364 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1248137,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "988 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1248137,
            "unit": "ns/op",
            "extra": "988 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "988 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "988 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1197893,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "984 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1197893,
            "unit": "ns/op",
            "extra": "984 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "984 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "984 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1191614,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1191614,
            "unit": "ns/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 258.6,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4773582 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 258.6,
            "unit": "ns/op",
            "extra": "4773582 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4773582 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4773582 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 258.3,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4824012 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 258.3,
            "unit": "ns/op",
            "extra": "4824012 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4824012 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4824012 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 251.2,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4837638 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 251.2,
            "unit": "ns/op",
            "extra": "4837638 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4837638 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4837638 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 49.45,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "25153152 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 49.45,
            "unit": "ns/op",
            "extra": "25153152 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "25153152 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "25153152 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 49.6,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24712736 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 49.6,
            "unit": "ns/op",
            "extra": "24712736 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24712736 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24712736 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 49.77,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "25075112 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 49.77,
            "unit": "ns/op",
            "extra": "25075112 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "25075112 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "25075112 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 89.55,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "13990995 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 89.55,
            "unit": "ns/op",
            "extra": "13990995 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "13990995 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "13990995 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 87.8,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "13150692 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 87.8,
            "unit": "ns/op",
            "extra": "13150692 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "13150692 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "13150692 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 88.07,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "13854300 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 88.07,
            "unit": "ns/op",
            "extra": "13854300 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "13854300 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "13854300 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 160,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7394726 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 160,
            "unit": "ns/op",
            "extra": "7394726 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7394726 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7394726 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 160,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7358966 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 160,
            "unit": "ns/op",
            "extra": "7358966 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7358966 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7358966 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 162.3,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7496137 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 162.3,
            "unit": "ns/op",
            "extra": "7496137 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7496137 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7496137 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 617.9,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1918389 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 617.9,
            "unit": "ns/op",
            "extra": "1918389 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1918389 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1918389 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 606.9,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2040036 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 606.9,
            "unit": "ns/op",
            "extra": "2040036 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2040036 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2040036 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 599.5,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1982042 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 599.5,
            "unit": "ns/op",
            "extra": "1982042 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1982042 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1982042 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 861442,
            "unit": "ns/op\t  33.28 MB/s\t 2347063 B/op\t      48 allocs/op",
            "extra": "1328 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 861442,
            "unit": "ns/op",
            "extra": "1328 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 33.28,
            "unit": "MB/s",
            "extra": "1328 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347063,
            "unit": "B/op",
            "extra": "1328 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1328 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 842002,
            "unit": "ns/op\t  34.05 MB/s\t 2347064 B/op\t      48 allocs/op",
            "extra": "1340 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 842002,
            "unit": "ns/op",
            "extra": "1340 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 34.05,
            "unit": "MB/s",
            "extra": "1340 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347064,
            "unit": "B/op",
            "extra": "1340 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1340 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 804579,
            "unit": "ns/op\t  35.64 MB/s\t 2347063 B/op\t      48 allocs/op",
            "extra": "1329 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 804579,
            "unit": "ns/op",
            "extra": "1329 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 35.64,
            "unit": "MB/s",
            "extra": "1329 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347063,
            "unit": "B/op",
            "extra": "1329 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1329 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2001070,
            "unit": "ns/op\t 524.01 MB/s\t 5241148 B/op\t      28 allocs/op",
            "extra": "620 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2001070,
            "unit": "ns/op",
            "extra": "620 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 524.01,
            "unit": "MB/s",
            "extra": "620 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241148,
            "unit": "B/op",
            "extra": "620 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "620 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2009875,
            "unit": "ns/op\t 521.71 MB/s\t 5241145 B/op\t      28 allocs/op",
            "extra": "594 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2009875,
            "unit": "ns/op",
            "extra": "594 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 521.71,
            "unit": "MB/s",
            "extra": "594 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241145,
            "unit": "B/op",
            "extra": "594 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "594 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1912905,
            "unit": "ns/op\t 548.16 MB/s\t 5241146 B/op\t      28 allocs/op",
            "extra": "670 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1912905,
            "unit": "ns/op",
            "extra": "670 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 548.16,
            "unit": "MB/s",
            "extra": "670 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241146,
            "unit": "B/op",
            "extra": "670 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "670 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1888168,
            "unit": "ns/op\t 555.34 MB/s\t 5241195 B/op\t      29 allocs/op",
            "extra": "579 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1888168,
            "unit": "ns/op",
            "extra": "579 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 555.34,
            "unit": "MB/s",
            "extra": "579 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241195,
            "unit": "B/op",
            "extra": "579 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "579 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1950811,
            "unit": "ns/op\t 537.51 MB/s\t 5241196 B/op\t      29 allocs/op",
            "extra": "585 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1950811,
            "unit": "ns/op",
            "extra": "585 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 537.51,
            "unit": "MB/s",
            "extra": "585 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241196,
            "unit": "B/op",
            "extra": "585 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "585 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1893156,
            "unit": "ns/op\t 553.88 MB/s\t 5241198 B/op\t      29 allocs/op",
            "extra": "628 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1893156,
            "unit": "ns/op",
            "extra": "628 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 553.88,
            "unit": "MB/s",
            "extra": "628 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241198,
            "unit": "B/op",
            "extra": "628 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "628 times\n4 procs"
          }
        ]
      },
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
          "id": "1f4d42df739b5a90c37315415dcd1dd77fcd7837",
          "message": "test: add coverage tests for cmd/config/discovery/transfer/webui/nat (#281) (#455)\n\n- cmd/meshdrop: parseFingerprint, parseRateLimit, promptPeerSelection,\n  loadConfig, cmdConfig/Init/Path, isTerminal (cmd coverage: 3→26%)\n- internal/config: DataPath XDG + home path tests (config: 62→83%)\n- internal/discovery: hexDecodeFingerprint + hexNibble (discovery: 28→52%)\n- internal/transfer: writeChunkMeta/Meta/ResumeState error paths,\n  readChunkMeta too-large, clientTLSPinned closure paths (transfer: 37→39%)\n- internal/nat: permanentError.Error/Unwrap (nat: 73→74%)\n- internal/webui: rateLimiter middleware malformed addr, handlePeers\n  cancelled ctx (webui: 68→69%)\n- ci.yml: coverage threshold 35 → 48 (measured 49.5%)\n\nTotal coverage: 40.2% → 49.5%\n\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T18:27:09+09:00",
          "tree_id": "a255f8187248500a0a62d24d734169d67270b0eb",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/1f4d42df739b5a90c37315415dcd1dd77fcd7837"
        },
        "date": 1787477369246,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3385,
            "unit": "ns/op\t 302.47 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "365647 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3385,
            "unit": "ns/op",
            "extra": "365647 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 302.47,
            "unit": "MB/s",
            "extra": "365647 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "365647 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "365647 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3442,
            "unit": "ns/op\t 297.46 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "367803 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3442,
            "unit": "ns/op",
            "extra": "367803 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 297.46,
            "unit": "MB/s",
            "extra": "367803 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "367803 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "367803 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3359,
            "unit": "ns/op\t 304.82 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "348814 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3359,
            "unit": "ns/op",
            "extra": "348814 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 304.82,
            "unit": "MB/s",
            "extra": "348814 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "348814 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "348814 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 25002,
            "unit": "ns/op\t 655.29 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "48086 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 25002,
            "unit": "ns/op",
            "extra": "48086 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 655.29,
            "unit": "MB/s",
            "extra": "48086 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "48086 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "48086 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 24914,
            "unit": "ns/op\t 657.61 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "46375 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 24914,
            "unit": "ns/op",
            "extra": "46375 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 657.61,
            "unit": "MB/s",
            "extra": "46375 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "46375 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "46375 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 24910,
            "unit": "ns/op\t 657.74 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "48255 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 24910,
            "unit": "ns/op",
            "extra": "48255 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 657.74,
            "unit": "MB/s",
            "extra": "48255 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "48255 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "48255 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 93838,
            "unit": "ns/op\t 698.39 MB/s\t      89 B/op\t       6 allocs/op",
            "extra": "12724 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 93838,
            "unit": "ns/op",
            "extra": "12724 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 698.39,
            "unit": "MB/s",
            "extra": "12724 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 89,
            "unit": "B/op",
            "extra": "12724 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "12724 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 93377,
            "unit": "ns/op\t 701.84 MB/s\t      79 B/op\t       6 allocs/op",
            "extra": "13189 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 93377,
            "unit": "ns/op",
            "extra": "13189 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 701.84,
            "unit": "MB/s",
            "extra": "13189 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 79,
            "unit": "B/op",
            "extra": "13189 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "13189 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 90216,
            "unit": "ns/op\t 726.43 MB/s\t      88 B/op\t       6 allocs/op",
            "extra": "13414 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 90216,
            "unit": "ns/op",
            "extra": "13414 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 726.43,
            "unit": "MB/s",
            "extra": "13414 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 88,
            "unit": "B/op",
            "extra": "13414 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "13414 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 353773,
            "unit": "ns/op\t 741.00 MB/s\t     262 B/op\t      15 allocs/op",
            "extra": "3216 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 353773,
            "unit": "ns/op",
            "extra": "3216 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 741,
            "unit": "MB/s",
            "extra": "3216 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 262,
            "unit": "B/op",
            "extra": "3216 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "3216 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 354054,
            "unit": "ns/op\t 740.41 MB/s\t     310 B/op\t      15 allocs/op",
            "extra": "3062 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 354054,
            "unit": "ns/op",
            "extra": "3062 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 740.41,
            "unit": "MB/s",
            "extra": "3062 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 310,
            "unit": "B/op",
            "extra": "3062 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "3062 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 348281,
            "unit": "ns/op\t 752.68 MB/s\t     278 B/op\t      15 allocs/op",
            "extra": "3342 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 348281,
            "unit": "ns/op",
            "extra": "3342 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 752.68,
            "unit": "MB/s",
            "extra": "3342 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 278,
            "unit": "B/op",
            "extra": "3342 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "3342 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1403212,
            "unit": "ns/op\t 747.27 MB/s\t    1961 B/op\t      51 allocs/op",
            "extra": "788 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1403212,
            "unit": "ns/op",
            "extra": "788 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 747.27,
            "unit": "MB/s",
            "extra": "788 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1961,
            "unit": "B/op",
            "extra": "788 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "788 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1391252,
            "unit": "ns/op\t 753.69 MB/s\t    1887 B/op\t      51 allocs/op",
            "extra": "831 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1391252,
            "unit": "ns/op",
            "extra": "831 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 753.69,
            "unit": "MB/s",
            "extra": "831 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1887,
            "unit": "B/op",
            "extra": "831 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "831 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1419323,
            "unit": "ns/op\t 738.79 MB/s\t    2038 B/op\t      51 allocs/op",
            "extra": "835 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1419323,
            "unit": "ns/op",
            "extra": "835 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 738.79,
            "unit": "MB/s",
            "extra": "835 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 2038,
            "unit": "B/op",
            "extra": "835 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "835 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 93529,
            "unit": "ns/op\t 700.70 MB/s\t      99 B/op\t       6 allocs/op",
            "extra": "13068 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 93529,
            "unit": "ns/op",
            "extra": "13068 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 700.7,
            "unit": "MB/s",
            "extra": "13068 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 99,
            "unit": "B/op",
            "extra": "13068 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "13068 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 91570,
            "unit": "ns/op\t 715.69 MB/s\t      69 B/op\t       6 allocs/op",
            "extra": "12538 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 91570,
            "unit": "ns/op",
            "extra": "12538 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 715.69,
            "unit": "MB/s",
            "extra": "12538 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 69,
            "unit": "B/op",
            "extra": "12538 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "12538 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 93617,
            "unit": "ns/op\t 700.05 MB/s\t      64 B/op\t       6 allocs/op",
            "extra": "12237 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 93617,
            "unit": "ns/op",
            "extra": "12237 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 700.05,
            "unit": "MB/s",
            "extra": "12237 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "12237 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "12237 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 967138,
            "unit": "ns/op\t   26098 B/op\t     321 allocs/op",
            "extra": "1208 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 967138,
            "unit": "ns/op",
            "extra": "1208 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26098,
            "unit": "B/op",
            "extra": "1208 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1208 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 965990,
            "unit": "ns/op\t   26073 B/op\t     321 allocs/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 965990,
            "unit": "ns/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26073,
            "unit": "B/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 965881,
            "unit": "ns/op\t   26076 B/op\t     321 allocs/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 965881,
            "unit": "ns/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26076,
            "unit": "B/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1236 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1330,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "838624 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1330,
            "unit": "ns/op",
            "extra": "838624 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "838624 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "838624 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1336,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "854024 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1336,
            "unit": "ns/op",
            "extra": "854024 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "854024 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "854024 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1325,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "800902 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1325,
            "unit": "ns/op",
            "extra": "800902 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "800902 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "800902 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15631,
            "unit": "ns/op\t      38 B/op\t       3 allocs/op",
            "extra": "75861 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15631,
            "unit": "ns/op",
            "extra": "75861 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 38,
            "unit": "B/op",
            "extra": "75861 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "75861 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15790,
            "unit": "ns/op\t      39 B/op\t       3 allocs/op",
            "extra": "76080 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15790,
            "unit": "ns/op",
            "extra": "76080 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 39,
            "unit": "B/op",
            "extra": "76080 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "76080 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15705,
            "unit": "ns/op\t      38 B/op\t       3 allocs/op",
            "extra": "75212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15705,
            "unit": "ns/op",
            "extra": "75212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 38,
            "unit": "B/op",
            "extra": "75212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "75212 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45909,
            "unit": "ns/op\t1427.51 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "25497 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45909,
            "unit": "ns/op",
            "extra": "25497 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1427.51,
            "unit": "MB/s",
            "extra": "25497 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "25497 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "25497 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45560,
            "unit": "ns/op\t1438.45 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "26234 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45560,
            "unit": "ns/op",
            "extra": "26234 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1438.45,
            "unit": "MB/s",
            "extra": "26234 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "26234 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "26234 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45838,
            "unit": "ns/op\t1429.74 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "25843 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45838,
            "unit": "ns/op",
            "extra": "25843 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1429.74,
            "unit": "MB/s",
            "extra": "25843 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "25843 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "25843 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 192725,
            "unit": "ns/op\t5440.78 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "6262 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 192725,
            "unit": "ns/op",
            "extra": "6262 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5440.78,
            "unit": "MB/s",
            "extra": "6262 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "6262 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6262 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 197285,
            "unit": "ns/op\t5315.02 MB/s\t   48625 B/op\t     175 allocs/op",
            "extra": "6082 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 197285,
            "unit": "ns/op",
            "extra": "6082 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5315.02,
            "unit": "MB/s",
            "extra": "6082 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48625,
            "unit": "B/op",
            "extra": "6082 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6082 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 195160,
            "unit": "ns/op\t5372.91 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "6222 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 195160,
            "unit": "ns/op",
            "extra": "6222 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5372.91,
            "unit": "MB/s",
            "extra": "6222 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "6222 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6222 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2213821,
            "unit": "ns/op\t7578.40 MB/s\t  179937 B/op\t    2115 allocs/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2213821,
            "unit": "ns/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 7578.4,
            "unit": "MB/s",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179937,
            "unit": "B/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "525 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2214105,
            "unit": "ns/op\t7577.43 MB/s\t  179929 B/op\t    2115 allocs/op",
            "extra": "538 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2214105,
            "unit": "ns/op",
            "extra": "538 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 7577.43,
            "unit": "MB/s",
            "extra": "538 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179929,
            "unit": "B/op",
            "extra": "538 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "538 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2221827,
            "unit": "ns/op\t7551.09 MB/s\t  179933 B/op\t    2115 allocs/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2221827,
            "unit": "ns/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 7551.09,
            "unit": "MB/s",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179933,
            "unit": "B/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 993.4,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1203124 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 993.4,
            "unit": "ns/op",
            "extra": "1203124 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1203124 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1203124 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1005,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1005,
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
            "value": 991.7,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1206955 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 991.7,
            "unit": "ns/op",
            "extra": "1206955 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1206955 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1206955 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 378.1,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3202234 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 378.1,
            "unit": "ns/op",
            "extra": "3202234 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3202234 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3202234 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 375.7,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3203818 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 375.7,
            "unit": "ns/op",
            "extra": "3203818 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3203818 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3203818 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 373.5,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3211089 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 373.5,
            "unit": "ns/op",
            "extra": "3211089 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3211089 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3211089 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1332,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "843615 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1332,
            "unit": "ns/op",
            "extra": "843615 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "843615 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "843615 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1344,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "850902 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1344,
            "unit": "ns/op",
            "extra": "850902 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "850902 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "850902 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1340,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "827223 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1340,
            "unit": "ns/op",
            "extra": "827223 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "827223 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "827223 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1141682,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1028 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1141682,
            "unit": "ns/op",
            "extra": "1028 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1028 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1028 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1129673,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1048 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1129673,
            "unit": "ns/op",
            "extra": "1048 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1048 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1048 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1130117,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1130117,
            "unit": "ns/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1059 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 235,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "5022030 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 235,
            "unit": "ns/op",
            "extra": "5022030 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "5022030 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "5022030 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 236.3,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "5143360 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 236.3,
            "unit": "ns/op",
            "extra": "5143360 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "5143360 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "5143360 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 236.2,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "5021718 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 236.2,
            "unit": "ns/op",
            "extra": "5021718 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "5021718 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "5021718 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 47.91,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24709360 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 47.91,
            "unit": "ns/op",
            "extra": "24709360 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24709360 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24709360 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 47.48,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24604005 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 47.48,
            "unit": "ns/op",
            "extra": "24604005 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24604005 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24604005 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 48.29,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24149214 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 48.29,
            "unit": "ns/op",
            "extra": "24149214 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24149214 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24149214 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 83.06,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "14219793 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 83.06,
            "unit": "ns/op",
            "extra": "14219793 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "14219793 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "14219793 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 82.52,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "14746237 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 82.52,
            "unit": "ns/op",
            "extra": "14746237 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "14746237 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "14746237 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 82.62,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "14106184 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 82.62,
            "unit": "ns/op",
            "extra": "14106184 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "14106184 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "14106184 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 157,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7800488 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 157,
            "unit": "ns/op",
            "extra": "7800488 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7800488 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7800488 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 156.3,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7699389 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 156.3,
            "unit": "ns/op",
            "extra": "7699389 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7699389 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7699389 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 157.3,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7572632 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 157.3,
            "unit": "ns/op",
            "extra": "7572632 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7572632 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7572632 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 621.4,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1912202 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 621.4,
            "unit": "ns/op",
            "extra": "1912202 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1912202 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1912202 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 627.2,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1929382 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 627.2,
            "unit": "ns/op",
            "extra": "1929382 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1929382 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1929382 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 624.6,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1913266 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 624.6,
            "unit": "ns/op",
            "extra": "1913266 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1913266 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1913266 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 548366,
            "unit": "ns/op\t  52.29 MB/s\t 2347060 B/op\t      48 allocs/op",
            "extra": "2240 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 548366,
            "unit": "ns/op",
            "extra": "2240 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 52.29,
            "unit": "MB/s",
            "extra": "2240 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347060,
            "unit": "B/op",
            "extra": "2240 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "2240 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 574884,
            "unit": "ns/op\t  49.87 MB/s\t 2347059 B/op\t      48 allocs/op",
            "extra": "1862 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 574884,
            "unit": "ns/op",
            "extra": "1862 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 49.87,
            "unit": "MB/s",
            "extra": "1862 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347059,
            "unit": "B/op",
            "extra": "1862 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1862 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 641843,
            "unit": "ns/op\t  44.67 MB/s\t 2347061 B/op\t      48 allocs/op",
            "extra": "1676 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 641843,
            "unit": "ns/op",
            "extra": "1676 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 44.67,
            "unit": "MB/s",
            "extra": "1676 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347061,
            "unit": "B/op",
            "extra": "1676 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1676 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1675947,
            "unit": "ns/op\t 625.66 MB/s\t 5241152 B/op\t      28 allocs/op",
            "extra": "702 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1675947,
            "unit": "ns/op",
            "extra": "702 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 625.66,
            "unit": "MB/s",
            "extra": "702 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241152,
            "unit": "B/op",
            "extra": "702 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "702 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1660350,
            "unit": "ns/op\t 631.54 MB/s\t 5241154 B/op\t      28 allocs/op",
            "extra": "704 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1660350,
            "unit": "ns/op",
            "extra": "704 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 631.54,
            "unit": "MB/s",
            "extra": "704 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241154,
            "unit": "B/op",
            "extra": "704 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "704 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1582134,
            "unit": "ns/op\t 662.76 MB/s\t 5241152 B/op\t      28 allocs/op",
            "extra": "765 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1582134,
            "unit": "ns/op",
            "extra": "765 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 662.76,
            "unit": "MB/s",
            "extra": "765 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241152,
            "unit": "B/op",
            "extra": "765 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "765 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1651403,
            "unit": "ns/op\t 634.96 MB/s\t 5241200 B/op\t      29 allocs/op",
            "extra": "697 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1651403,
            "unit": "ns/op",
            "extra": "697 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 634.96,
            "unit": "MB/s",
            "extra": "697 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241200,
            "unit": "B/op",
            "extra": "697 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "697 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1673969,
            "unit": "ns/op\t 626.40 MB/s\t 5241200 B/op\t      29 allocs/op",
            "extra": "712 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1673969,
            "unit": "ns/op",
            "extra": "712 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 626.4,
            "unit": "MB/s",
            "extra": "712 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241200,
            "unit": "B/op",
            "extra": "712 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "712 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1756234,
            "unit": "ns/op\t 597.06 MB/s\t 5241201 B/op\t      29 allocs/op",
            "extra": "754 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1756234,
            "unit": "ns/op",
            "extra": "754 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 597.06,
            "unit": "MB/s",
            "extra": "754 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241201,
            "unit": "B/op",
            "extra": "754 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "754 times\n4 procs"
          }
        ]
      },
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
          "id": "3108ab28b49d991bc7fb739decf4f3e73dd02f4f",
          "message": "test(integration): ローカルループバックによる E2E 統合テスト (#283/#302/#304) (#456)\n\nquic.go: AppError code=0 を EOF として扱い、ゼロバイトファイル転送を正常終了させる。\n         sanitizeName の引数を filepath.Base(meta.Name) に修正（フルパスに対するサニタイズ誤り）。\ntls.go:  自己署名証明書を CA 証明書として生成（IsCA=true / KeyUsageCertSign）。\n         quic-go が証明書を検証できずに接続を拒否していた問題を修正。\n\nintegration_test.go: --tags=integration で実行される5テスト追加:\n  - TestIntegration_SingleFile_Send_Receive     (#302)\n  - TestIntegration_Directory_Send_Receive      (#302)\n  - TestIntegration_Resume_Interrupted          (#304)\n  - TestIntegration_NoResume_IgnoresCheckpoint  (#304)\n  - TestIntegration_ZeroByteFile                (#304)\n\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T18:27:33+09:00",
          "tree_id": "0216591fabceef48ff0d5b54259d2606515f0886",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/3108ab28b49d991bc7fb739decf4f3e73dd02f4f"
        },
        "date": 1787477390927,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2348,
            "unit": "ns/op\t 436.10 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "509143 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2348,
            "unit": "ns/op",
            "extra": "509143 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 436.1,
            "unit": "MB/s",
            "extra": "509143 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "509143 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "509143 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2313,
            "unit": "ns/op\t 442.79 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "517490 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2313,
            "unit": "ns/op",
            "extra": "517490 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 442.79,
            "unit": "MB/s",
            "extra": "517490 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "517490 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "517490 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2313,
            "unit": "ns/op\t 442.79 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "498949 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2313,
            "unit": "ns/op",
            "extra": "498949 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 442.79,
            "unit": "MB/s",
            "extra": "498949 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "498949 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "498949 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15609,
            "unit": "ns/op\t1049.63 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "76618 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15609,
            "unit": "ns/op",
            "extra": "76618 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1049.63,
            "unit": "MB/s",
            "extra": "76618 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "76618 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "76618 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15624,
            "unit": "ns/op\t1048.65 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "76998 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15624,
            "unit": "ns/op",
            "extra": "76998 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1048.65,
            "unit": "MB/s",
            "extra": "76998 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "76998 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "76998 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15643,
            "unit": "ns/op\t1047.36 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "76780 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15643,
            "unit": "ns/op",
            "extra": "76780 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1047.36,
            "unit": "MB/s",
            "extra": "76780 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "76780 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "76780 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 54710,
            "unit": "ns/op\t1197.88 MB/s\t      70 B/op\t       6 allocs/op",
            "extra": "21916 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 54710,
            "unit": "ns/op",
            "extra": "21916 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1197.88,
            "unit": "MB/s",
            "extra": "21916 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 70,
            "unit": "B/op",
            "extra": "21916 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21916 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 54697,
            "unit": "ns/op\t1198.16 MB/s\t      73 B/op\t       6 allocs/op",
            "extra": "21888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 54697,
            "unit": "ns/op",
            "extra": "21888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1198.16,
            "unit": "MB/s",
            "extra": "21888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 73,
            "unit": "B/op",
            "extra": "21888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 54819,
            "unit": "ns/op\t1195.50 MB/s\t      70 B/op\t       6 allocs/op",
            "extra": "21886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 54819,
            "unit": "ns/op",
            "extra": "21886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1195.5,
            "unit": "MB/s",
            "extra": "21886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 70,
            "unit": "B/op",
            "extra": "21886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 233829,
            "unit": "ns/op\t1121.09 MB/s\t     264 B/op\t      15 allocs/op",
            "extra": "5056 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 233829,
            "unit": "ns/op",
            "extra": "5056 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1121.09,
            "unit": "MB/s",
            "extra": "5056 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 264,
            "unit": "B/op",
            "extra": "5056 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "5056 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 234572,
            "unit": "ns/op\t1117.54 MB/s\t     263 B/op\t      15 allocs/op",
            "extra": "5066 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 234572,
            "unit": "ns/op",
            "extra": "5066 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1117.54,
            "unit": "MB/s",
            "extra": "5066 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 263,
            "unit": "B/op",
            "extra": "5066 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "5066 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 232740,
            "unit": "ns/op\t1126.34 MB/s\t     224 B/op\t      15 allocs/op",
            "extra": "5148 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 232740,
            "unit": "ns/op",
            "extra": "5148 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1126.34,
            "unit": "MB/s",
            "extra": "5148 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 224,
            "unit": "B/op",
            "extra": "5148 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "5148 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 907852,
            "unit": "ns/op\t1155.01 MB/s\t    1529 B/op\t      51 allocs/op",
            "extra": "1332 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 907852,
            "unit": "ns/op",
            "extra": "1332 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1155.01,
            "unit": "MB/s",
            "extra": "1332 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1529,
            "unit": "B/op",
            "extra": "1332 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1332 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 906843,
            "unit": "ns/op\t1156.29 MB/s\t    1450 B/op\t      51 allocs/op",
            "extra": "1304 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 906843,
            "unit": "ns/op",
            "extra": "1304 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1156.29,
            "unit": "MB/s",
            "extra": "1304 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1450,
            "unit": "B/op",
            "extra": "1304 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1304 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 909671,
            "unit": "ns/op\t1152.70 MB/s\t    1400 B/op\t      51 allocs/op",
            "extra": "1304 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 909671,
            "unit": "ns/op",
            "extra": "1304 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1152.7,
            "unit": "MB/s",
            "extra": "1304 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1400,
            "unit": "B/op",
            "extra": "1304 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1304 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 54676,
            "unit": "ns/op\t1198.61 MB/s\t      64 B/op\t       6 allocs/op",
            "extra": "21886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 54676,
            "unit": "ns/op",
            "extra": "21886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1198.61,
            "unit": "MB/s",
            "extra": "21886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "21886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 54604,
            "unit": "ns/op\t1200.20 MB/s\t      67 B/op\t       6 allocs/op",
            "extra": "21888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 54604,
            "unit": "ns/op",
            "extra": "21888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1200.2,
            "unit": "MB/s",
            "extra": "21888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 67,
            "unit": "B/op",
            "extra": "21888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 55410,
            "unit": "ns/op\t1182.74 MB/s\t      64 B/op\t       6 allocs/op",
            "extra": "22044 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 55410,
            "unit": "ns/op",
            "extra": "22044 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1182.74,
            "unit": "MB/s",
            "extra": "22044 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "22044 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "22044 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 969314,
            "unit": "ns/op\t   26084 B/op\t     321 allocs/op",
            "extra": "1227 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 969314,
            "unit": "ns/op",
            "extra": "1227 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26084,
            "unit": "B/op",
            "extra": "1227 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1227 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 966277,
            "unit": "ns/op\t   26067 B/op\t     321 allocs/op",
            "extra": "1198 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 966277,
            "unit": "ns/op",
            "extra": "1198 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26067,
            "unit": "B/op",
            "extra": "1198 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1198 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 956495,
            "unit": "ns/op\t   26067 B/op\t     321 allocs/op",
            "extra": "1237 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 956495,
            "unit": "ns/op",
            "extra": "1237 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26067,
            "unit": "B/op",
            "extra": "1237 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1237 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1057,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "978867 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1057,
            "unit": "ns/op",
            "extra": "978867 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "978867 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "978867 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1058,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "1133386 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1058,
            "unit": "ns/op",
            "extra": "1133386 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "1133386 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "1133386 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1055,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "998349 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1055,
            "unit": "ns/op",
            "extra": "998349 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "998349 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "998349 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 11184,
            "unit": "ns/op\t      36 B/op\t       3 allocs/op",
            "extra": "105972 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 11184,
            "unit": "ns/op",
            "extra": "105972 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 36,
            "unit": "B/op",
            "extra": "105972 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "105972 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 11205,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "104388 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 11205,
            "unit": "ns/op",
            "extra": "104388 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "104388 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "104388 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 11189,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "105476 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 11189,
            "unit": "ns/op",
            "extra": "105476 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "105476 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "105476 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 39708,
            "unit": "ns/op\t1650.46 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "30171 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 39708,
            "unit": "ns/op",
            "extra": "30171 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1650.46,
            "unit": "MB/s",
            "extra": "30171 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "30171 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "30171 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 39949,
            "unit": "ns/op\t1640.51 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "26725 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 39949,
            "unit": "ns/op",
            "extra": "26725 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1640.51,
            "unit": "MB/s",
            "extra": "26725 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "26725 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "26725 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 40043,
            "unit": "ns/op\t1636.65 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "29865 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 40043,
            "unit": "ns/op",
            "extra": "29865 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1636.65,
            "unit": "MB/s",
            "extra": "29865 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "29865 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "29865 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 191558,
            "unit": "ns/op\t5473.93 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "6364 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 191558,
            "unit": "ns/op",
            "extra": "6364 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5473.93,
            "unit": "MB/s",
            "extra": "6364 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "6364 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6364 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 191327,
            "unit": "ns/op\t5480.55 MB/s\t   48626 B/op\t     175 allocs/op",
            "extra": "6368 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 191327,
            "unit": "ns/op",
            "extra": "6368 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5480.55,
            "unit": "MB/s",
            "extra": "6368 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48626,
            "unit": "B/op",
            "extra": "6368 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6368 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 194663,
            "unit": "ns/op\t5386.62 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "6416 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 194663,
            "unit": "ns/op",
            "extra": "6416 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5386.62,
            "unit": "MB/s",
            "extra": "6416 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "6416 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6416 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2498030,
            "unit": "ns/op\t6716.18 MB/s\t  179938 B/op\t    2115 allocs/op",
            "extra": "488 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2498030,
            "unit": "ns/op",
            "extra": "488 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 6716.18,
            "unit": "MB/s",
            "extra": "488 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179938,
            "unit": "B/op",
            "extra": "488 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "488 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2421199,
            "unit": "ns/op\t6929.30 MB/s\t  179923 B/op\t    2115 allocs/op",
            "extra": "496 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2421199,
            "unit": "ns/op",
            "extra": "496 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 6929.3,
            "unit": "MB/s",
            "extra": "496 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179923,
            "unit": "B/op",
            "extra": "496 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "496 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2542434,
            "unit": "ns/op\t6598.88 MB/s\t  179931 B/op\t    2115 allocs/op",
            "extra": "481 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2542434,
            "unit": "ns/op",
            "extra": "481 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 6598.88,
            "unit": "MB/s",
            "extra": "481 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179931,
            "unit": "B/op",
            "extra": "481 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "481 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 707,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1605817 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 707,
            "unit": "ns/op",
            "extra": "1605817 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1605817 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1605817 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 719.8,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1680230 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 719.8,
            "unit": "ns/op",
            "extra": "1680230 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1680230 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1680230 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 729.2,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1672420 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 729.2,
            "unit": "ns/op",
            "extra": "1672420 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1672420 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1672420 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 296.2,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "4034583 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 296.2,
            "unit": "ns/op",
            "extra": "4034583 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "4034583 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4034583 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 305.9,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "4016426 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 305.9,
            "unit": "ns/op",
            "extra": "4016426 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "4016426 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4016426 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 296.1,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "4014201 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 296.1,
            "unit": "ns/op",
            "extra": "4014201 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "4014201 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4014201 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1046,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1046,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1059,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1059,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1049,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1049,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 881764,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1336 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 881764,
            "unit": "ns/op",
            "extra": "1336 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1336 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1336 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 880356,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "1336 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 880356,
            "unit": "ns/op",
            "extra": "1336 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "1336 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1336 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 873840,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1324 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 873840,
            "unit": "ns/op",
            "extra": "1324 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1324 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1324 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 186.4,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "6362592 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 186.4,
            "unit": "ns/op",
            "extra": "6362592 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "6362592 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "6362592 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 186.8,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "6378528 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 186.8,
            "unit": "ns/op",
            "extra": "6378528 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "6378528 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "6378528 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 186.9,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "6373586 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 186.9,
            "unit": "ns/op",
            "extra": "6373586 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "6373586 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "6373586 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 34.98,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "34696256 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 34.98,
            "unit": "ns/op",
            "extra": "34696256 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "34696256 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "34696256 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 35.35,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "33827330 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 35.35,
            "unit": "ns/op",
            "extra": "33827330 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "33827330 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "33827330 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 35.24,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "34033894 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 35.24,
            "unit": "ns/op",
            "extra": "34033894 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "34033894 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "34033894 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 58.95,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "20769163 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 58.95,
            "unit": "ns/op",
            "extra": "20769163 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "20769163 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "20769163 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 58.33,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "21141470 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 58.33,
            "unit": "ns/op",
            "extra": "21141470 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "21141470 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "21141470 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 57.96,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "20845820 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 57.96,
            "unit": "ns/op",
            "extra": "20845820 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "20845820 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "20845820 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 103.8,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "11661702 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 103.8,
            "unit": "ns/op",
            "extra": "11661702 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "11661702 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "11661702 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 103.6,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "11828660 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 103.6,
            "unit": "ns/op",
            "extra": "11828660 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "11828660 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "11828660 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 106.1,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "11347171 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 106.1,
            "unit": "ns/op",
            "extra": "11347171 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "11347171 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "11347171 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 394.6,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "3075675 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 394.6,
            "unit": "ns/op",
            "extra": "3075675 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "3075675 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "3075675 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 387.3,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "3058351 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 387.3,
            "unit": "ns/op",
            "extra": "3058351 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "3058351 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "3058351 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 390.9,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "3099033 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 390.9,
            "unit": "ns/op",
            "extra": "3099033 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "3099033 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "3099033 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 484327,
            "unit": "ns/op\t  59.20 MB/s\t 2347062 B/op\t      48 allocs/op",
            "extra": "2841 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 484327,
            "unit": "ns/op",
            "extra": "2841 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 59.2,
            "unit": "MB/s",
            "extra": "2841 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347062,
            "unit": "B/op",
            "extra": "2841 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "2841 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 547293,
            "unit": "ns/op\t  52.39 MB/s\t 2347062 B/op\t      48 allocs/op",
            "extra": "2250 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 547293,
            "unit": "ns/op",
            "extra": "2250 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 52.39,
            "unit": "MB/s",
            "extra": "2250 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347062,
            "unit": "B/op",
            "extra": "2250 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "2250 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 531616,
            "unit": "ns/op\t  53.93 MB/s\t 2347062 B/op\t      48 allocs/op",
            "extra": "2354 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 531616,
            "unit": "ns/op",
            "extra": "2354 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 53.93,
            "unit": "MB/s",
            "extra": "2354 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347062,
            "unit": "B/op",
            "extra": "2354 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "2354 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1430108,
            "unit": "ns/op\t 733.21 MB/s\t 5241146 B/op\t      28 allocs/op",
            "extra": "770 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1430108,
            "unit": "ns/op",
            "extra": "770 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 733.21,
            "unit": "MB/s",
            "extra": "770 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241146,
            "unit": "B/op",
            "extra": "770 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "770 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1415782,
            "unit": "ns/op\t 740.63 MB/s\t 5241149 B/op\t      28 allocs/op",
            "extra": "850 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1415782,
            "unit": "ns/op",
            "extra": "850 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 740.63,
            "unit": "MB/s",
            "extra": "850 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241149,
            "unit": "B/op",
            "extra": "850 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "850 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1475407,
            "unit": "ns/op\t 710.70 MB/s\t 5241148 B/op\t      28 allocs/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1475407,
            "unit": "ns/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 710.7,
            "unit": "MB/s",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241148,
            "unit": "B/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "819 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1434498,
            "unit": "ns/op\t 730.97 MB/s\t 5241195 B/op\t      29 allocs/op",
            "extra": "861 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1434498,
            "unit": "ns/op",
            "extra": "861 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 730.97,
            "unit": "MB/s",
            "extra": "861 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241195,
            "unit": "B/op",
            "extra": "861 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "861 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1488022,
            "unit": "ns/op\t 704.68 MB/s\t 5241197 B/op\t      29 allocs/op",
            "extra": "844 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1488022,
            "unit": "ns/op",
            "extra": "844 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 704.68,
            "unit": "MB/s",
            "extra": "844 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241197,
            "unit": "B/op",
            "extra": "844 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "844 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1544784,
            "unit": "ns/op\t 678.78 MB/s\t 5241198 B/op\t      29 allocs/op",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1544784,
            "unit": "ns/op",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 678.78,
            "unit": "MB/s",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241198,
            "unit": "B/op",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "764 times\n4 procs"
          }
        ]
      },
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
          "id": "8e76a532e9d293b09b7ea35eb9bc9bc022306365",
          "message": "test(webui): handleSend 413, Content-Disposition quotes, SSE coverage (#264/#265/#310) (#454)\n\n* test(webui): handleSend 413, Content-Disposition quotes, SSE coverage (#264/#265/#310)\n\n- Move maxSingleFileUpload to package-level var so tests can override it without sending 512 MiB\n- TestHandleSend_BodyTooLarge: verify 413 for oversized body\n- TestHandleDownload_ContentDispositionQuotedFilename: verify mime.FormatMediaType escapes double-quotes\n- TestHandleSend_InvalidPeer / MissingFileField / InvalidRateLimit / ValidRequest: cover remaining 400/200 paths\n- TestHandleSSE_EventDelivered: verify event is written to SSE stream\n- TestHandleSSE_NotFlusherReturns500: cover the non-Flusher early-exit path\nwebui coverage: 68.7% → 73.0%\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\n\n* fix(test): use OS-safe filename in ContentDisposition test (#265)\n\nWindows forbids double-quote in filenames; use a space+parentheses\nfilename instead — it tests the same RFC 6266 encoding path and\nruns cleanly on all platforms.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\n\n---------\n\nCo-authored-by: flipslidersand <yukihanashopping0212@gmail.com>\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T18:31:01+09:00",
          "tree_id": "d686e9b81e5d776dc59abf1cf3f84ac224c42c4c",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/8e76a532e9d293b09b7ea35eb9bc9bc022306365"
        },
        "date": 1787477604739,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3003,
            "unit": "ns/op\t 341.02 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "402553 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3003,
            "unit": "ns/op",
            "extra": "402553 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 341.02,
            "unit": "MB/s",
            "extra": "402553 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "402553 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "402553 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2995,
            "unit": "ns/op\t 341.87 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "395925 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2995,
            "unit": "ns/op",
            "extra": "395925 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 341.87,
            "unit": "MB/s",
            "extra": "395925 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "395925 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "395925 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2986,
            "unit": "ns/op\t 342.93 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "396162 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2986,
            "unit": "ns/op",
            "extra": "396162 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 342.93,
            "unit": "MB/s",
            "extra": "396162 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "396162 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "396162 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17795,
            "unit": "ns/op\t 920.70 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "68258 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17795,
            "unit": "ns/op",
            "extra": "68258 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 920.7,
            "unit": "MB/s",
            "extra": "68258 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "68258 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "68258 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17805,
            "unit": "ns/op\t 920.18 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "67249 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17805,
            "unit": "ns/op",
            "extra": "67249 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 920.18,
            "unit": "MB/s",
            "extra": "67249 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "67249 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "67249 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17827,
            "unit": "ns/op\t 919.04 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "67846 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17827,
            "unit": "ns/op",
            "extra": "67846 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 919.04,
            "unit": "MB/s",
            "extra": "67846 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "67846 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "67846 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 67501,
            "unit": "ns/op\t 970.88 MB/s\t      75 B/op\t       6 allocs/op",
            "extra": "18130 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 67501,
            "unit": "ns/op",
            "extra": "18130 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 970.88,
            "unit": "MB/s",
            "extra": "18130 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 75,
            "unit": "B/op",
            "extra": "18130 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18130 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 64848,
            "unit": "ns/op\t1010.61 MB/s\t      82 B/op\t       6 allocs/op",
            "extra": "18423 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 64848,
            "unit": "ns/op",
            "extra": "18423 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1010.61,
            "unit": "MB/s",
            "extra": "18423 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 82,
            "unit": "B/op",
            "extra": "18423 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18423 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 65366,
            "unit": "ns/op\t1002.60 MB/s\t      74 B/op\t       6 allocs/op",
            "extra": "18405 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 65366,
            "unit": "ns/op",
            "extra": "18405 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1002.6,
            "unit": "MB/s",
            "extra": "18405 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 74,
            "unit": "B/op",
            "extra": "18405 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18405 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 255329,
            "unit": "ns/op\t1026.69 MB/s\t     259 B/op\t      15 allocs/op",
            "extra": "4617 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 255329,
            "unit": "ns/op",
            "extra": "4617 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1026.69,
            "unit": "MB/s",
            "extra": "4617 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 259,
            "unit": "B/op",
            "extra": "4617 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4617 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 254734,
            "unit": "ns/op\t1029.09 MB/s\t     260 B/op\t      15 allocs/op",
            "extra": "4596 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 254734,
            "unit": "ns/op",
            "extra": "4596 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1029.09,
            "unit": "MB/s",
            "extra": "4596 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 260,
            "unit": "B/op",
            "extra": "4596 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4596 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 256017,
            "unit": "ns/op\t1023.93 MB/s\t     261 B/op\t      15 allocs/op",
            "extra": "4562 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 256017,
            "unit": "ns/op",
            "extra": "4562 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1023.93,
            "unit": "MB/s",
            "extra": "4562 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 261,
            "unit": "B/op",
            "extra": "4562 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4562 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1052302,
            "unit": "ns/op\t 996.46 MB/s\t    1527 B/op\t      51 allocs/op",
            "extra": "1135 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1052302,
            "unit": "ns/op",
            "extra": "1135 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 996.46,
            "unit": "MB/s",
            "extra": "1135 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1527,
            "unit": "B/op",
            "extra": "1135 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1135 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1058710,
            "unit": "ns/op\t 990.43 MB/s\t    1463 B/op\t      51 allocs/op",
            "extra": "1143 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1058710,
            "unit": "ns/op",
            "extra": "1143 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 990.43,
            "unit": "MB/s",
            "extra": "1143 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1463,
            "unit": "B/op",
            "extra": "1143 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1143 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1057477,
            "unit": "ns/op\t 991.58 MB/s\t    1515 B/op\t      51 allocs/op",
            "extra": "1149 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1057477,
            "unit": "ns/op",
            "extra": "1149 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 991.58,
            "unit": "MB/s",
            "extra": "1149 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1515,
            "unit": "B/op",
            "extra": "1149 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1149 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 64429,
            "unit": "ns/op\t1017.18 MB/s\t      74 B/op\t       6 allocs/op",
            "extra": "18574 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 64429,
            "unit": "ns/op",
            "extra": "18574 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1017.18,
            "unit": "MB/s",
            "extra": "18574 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 74,
            "unit": "B/op",
            "extra": "18574 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18574 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 64630,
            "unit": "ns/op\t1014.02 MB/s\t      71 B/op\t       6 allocs/op",
            "extra": "18492 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 64630,
            "unit": "ns/op",
            "extra": "18492 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1014.02,
            "unit": "MB/s",
            "extra": "18492 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 71,
            "unit": "B/op",
            "extra": "18492 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18492 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 64451,
            "unit": "ns/op\t1016.83 MB/s\t      71 B/op\t       6 allocs/op",
            "extra": "18644 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 64451,
            "unit": "ns/op",
            "extra": "18644 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1016.83,
            "unit": "MB/s",
            "extra": "18644 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 71,
            "unit": "B/op",
            "extra": "18644 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18644 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1111171,
            "unit": "ns/op\t   26072 B/op\t     321 allocs/op",
            "extra": "1035 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1111171,
            "unit": "ns/op",
            "extra": "1035 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26072,
            "unit": "B/op",
            "extra": "1035 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1035 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1114909,
            "unit": "ns/op\t   26080 B/op\t     321 allocs/op",
            "extra": "1052 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1114909,
            "unit": "ns/op",
            "extra": "1052 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26080,
            "unit": "B/op",
            "extra": "1052 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1052 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1115077,
            "unit": "ns/op\t   26067 B/op\t     321 allocs/op",
            "extra": "1046 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1115077,
            "unit": "ns/op",
            "extra": "1046 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26067,
            "unit": "B/op",
            "extra": "1046 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1046 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1468,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "760218 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1468,
            "unit": "ns/op",
            "extra": "760218 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "760218 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "760218 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1454,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "780018 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1454,
            "unit": "ns/op",
            "extra": "780018 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "780018 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "780018 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1442,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "738354 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1442,
            "unit": "ns/op",
            "extra": "738354 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "738354 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "738354 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13382,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "88658 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13382,
            "unit": "ns/op",
            "extra": "88658 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "88658 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "88658 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13299,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "88996 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13299,
            "unit": "ns/op",
            "extra": "88996 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "88996 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "88996 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13350,
            "unit": "ns/op\t      39 B/op\t       3 allocs/op",
            "extra": "88611 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13350,
            "unit": "ns/op",
            "extra": "88611 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 39,
            "unit": "B/op",
            "extra": "88611 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "88611 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53211,
            "unit": "ns/op\t1231.62 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22471 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53211,
            "unit": "ns/op",
            "extra": "22471 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1231.62,
            "unit": "MB/s",
            "extra": "22471 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22471 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22471 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53462,
            "unit": "ns/op\t1225.85 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22564 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53462,
            "unit": "ns/op",
            "extra": "22564 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1225.85,
            "unit": "MB/s",
            "extra": "22564 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22564 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22564 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53666,
            "unit": "ns/op\t1221.19 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22412 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53666,
            "unit": "ns/op",
            "extra": "22412 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1221.19,
            "unit": "MB/s",
            "extra": "22412 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22412 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22412 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 280835,
            "unit": "ns/op\t3733.79 MB/s\t   48626 B/op\t     175 allocs/op",
            "extra": "4278 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 280835,
            "unit": "ns/op",
            "extra": "4278 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3733.79,
            "unit": "MB/s",
            "extra": "4278 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48626,
            "unit": "B/op",
            "extra": "4278 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4278 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 285413,
            "unit": "ns/op\t3673.89 MB/s\t   48625 B/op\t     175 allocs/op",
            "extra": "3675 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 285413,
            "unit": "ns/op",
            "extra": "3675 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3673.89,
            "unit": "MB/s",
            "extra": "3675 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48625,
            "unit": "B/op",
            "extra": "3675 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "3675 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 279378,
            "unit": "ns/op\t3753.25 MB/s\t   48628 B/op\t     175 allocs/op",
            "extra": "4320 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 279378,
            "unit": "ns/op",
            "extra": "4320 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3753.25,
            "unit": "MB/s",
            "extra": "4320 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48628,
            "unit": "B/op",
            "extra": "4320 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4320 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3801404,
            "unit": "ns/op\t4413.43 MB/s\t  179972 B/op\t    2115 allocs/op",
            "extra": "334 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3801404,
            "unit": "ns/op",
            "extra": "334 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4413.43,
            "unit": "MB/s",
            "extra": "334 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179972,
            "unit": "B/op",
            "extra": "334 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "334 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3428052,
            "unit": "ns/op\t4894.10 MB/s\t  179923 B/op\t    2115 allocs/op",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3428052,
            "unit": "ns/op",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4894.1,
            "unit": "MB/s",
            "extra": "346 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179923,
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
            "value": 3411206,
            "unit": "ns/op\t4918.27 MB/s\t  179921 B/op\t    2115 allocs/op",
            "extra": "349 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3411206,
            "unit": "ns/op",
            "extra": "349 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4918.27,
            "unit": "MB/s",
            "extra": "349 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179921,
            "unit": "B/op",
            "extra": "349 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "349 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 971.7,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1242646 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 971.7,
            "unit": "ns/op",
            "extra": "1242646 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1242646 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1242646 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 991.6,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1237750 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 991.6,
            "unit": "ns/op",
            "extra": "1237750 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1237750 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1237750 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 954.6,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1238359 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 954.6,
            "unit": "ns/op",
            "extra": "1238359 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1238359 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1238359 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 442,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2718181 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 442,
            "unit": "ns/op",
            "extra": "2718181 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2718181 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2718181 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 444.6,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2700783 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 444.6,
            "unit": "ns/op",
            "extra": "2700783 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2700783 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2700783 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 443.1,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2681979 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 443.1,
            "unit": "ns/op",
            "extra": "2681979 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2681979 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2681979 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1514,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "754125 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1514,
            "unit": "ns/op",
            "extra": "754125 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "754125 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "754125 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1520,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "750682 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1520,
            "unit": "ns/op",
            "extra": "750682 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "750682 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "750682 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1514,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "741546 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1514,
            "unit": "ns/op",
            "extra": "741546 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "741546 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "741546 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1301782,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "937 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1301782,
            "unit": "ns/op",
            "extra": "937 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "937 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "937 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1315251,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "896 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1315251,
            "unit": "ns/op",
            "extra": "896 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "896 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "896 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1312251,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "915 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1312251,
            "unit": "ns/op",
            "extra": "915 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "915 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "915 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 289.6,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4158009 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 289.6,
            "unit": "ns/op",
            "extra": "4158009 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4158009 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4158009 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 287.2,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4139913 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 287.2,
            "unit": "ns/op",
            "extra": "4139913 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4139913 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4139913 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 286.3,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4109668 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 286.3,
            "unit": "ns/op",
            "extra": "4109668 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4109668 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4109668 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45.62,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "25859085 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45.62,
            "unit": "ns/op",
            "extra": "25859085 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "25859085 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "25859085 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45.66,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24091875 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45.66,
            "unit": "ns/op",
            "extra": "24091875 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24091875 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24091875 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45.85,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "25780527 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45.85,
            "unit": "ns/op",
            "extra": "25780527 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "25780527 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "25780527 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 77.1,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "15610953 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 77.1,
            "unit": "ns/op",
            "extra": "15610953 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "15610953 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "15610953 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 75.84,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "15047022 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 75.84,
            "unit": "ns/op",
            "extra": "15047022 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "15047022 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "15047022 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 77.32,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "15111438 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 77.32,
            "unit": "ns/op",
            "extra": "15111438 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "15111438 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "15111438 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 137,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "8939574 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 137,
            "unit": "ns/op",
            "extra": "8939574 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "8939574 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "8939574 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 135,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "8817051 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 135,
            "unit": "ns/op",
            "extra": "8817051 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "8817051 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "8817051 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 133.8,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "8846289 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 133.8,
            "unit": "ns/op",
            "extra": "8846289 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "8846289 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "8846289 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 521.5,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2383704 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 521.5,
            "unit": "ns/op",
            "extra": "2383704 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2383704 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2383704 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 502,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2422662 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 502,
            "unit": "ns/op",
            "extra": "2422662 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2422662 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2422662 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 507.6,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2298318 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 507.6,
            "unit": "ns/op",
            "extra": "2298318 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2298318 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2298318 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 676886,
            "unit": "ns/op\t  42.36 MB/s\t 2347064 B/op\t      48 allocs/op",
            "extra": "2066 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 676886,
            "unit": "ns/op",
            "extra": "2066 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 42.36,
            "unit": "MB/s",
            "extra": "2066 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347064,
            "unit": "B/op",
            "extra": "2066 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "2066 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 776873,
            "unit": "ns/op\t  36.91 MB/s\t 2347066 B/op\t      48 allocs/op",
            "extra": "1510 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 776873,
            "unit": "ns/op",
            "extra": "1510 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 36.91,
            "unit": "MB/s",
            "extra": "1510 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347066,
            "unit": "B/op",
            "extra": "1510 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1510 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 740108,
            "unit": "ns/op\t  38.74 MB/s\t 2347064 B/op\t      48 allocs/op",
            "extra": "1609 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 740108,
            "unit": "ns/op",
            "extra": "1609 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 38.74,
            "unit": "MB/s",
            "extra": "1609 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347064,
            "unit": "B/op",
            "extra": "1609 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1609 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1983417,
            "unit": "ns/op\t 528.67 MB/s\t 5241150 B/op\t      28 allocs/op",
            "extra": "600 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1983417,
            "unit": "ns/op",
            "extra": "600 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 528.67,
            "unit": "MB/s",
            "extra": "600 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241150,
            "unit": "B/op",
            "extra": "600 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "600 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1943485,
            "unit": "ns/op\t 539.53 MB/s\t 5241148 B/op\t      28 allocs/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1943485,
            "unit": "ns/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 539.53,
            "unit": "MB/s",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241148,
            "unit": "B/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1931092,
            "unit": "ns/op\t 543.00 MB/s\t 5241151 B/op\t      28 allocs/op",
            "extra": "660 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1931092,
            "unit": "ns/op",
            "extra": "660 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 543,
            "unit": "MB/s",
            "extra": "660 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241151,
            "unit": "B/op",
            "extra": "660 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "660 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2165885,
            "unit": "ns/op\t 484.13 MB/s\t 5241201 B/op\t      29 allocs/op",
            "extra": "490 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2165885,
            "unit": "ns/op",
            "extra": "490 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 484.13,
            "unit": "MB/s",
            "extra": "490 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241201,
            "unit": "B/op",
            "extra": "490 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "490 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2155192,
            "unit": "ns/op\t 486.53 MB/s\t 5241197 B/op\t      29 allocs/op",
            "extra": "656 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2155192,
            "unit": "ns/op",
            "extra": "656 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 486.53,
            "unit": "MB/s",
            "extra": "656 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241197,
            "unit": "B/op",
            "extra": "656 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "656 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2050615,
            "unit": "ns/op\t 511.35 MB/s\t 5241195 B/op\t      29 allocs/op",
            "extra": "565 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2050615,
            "unit": "ns/op",
            "extra": "565 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 511.35,
            "unit": "MB/s",
            "extra": "565 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241195,
            "unit": "B/op",
            "extra": "565 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "565 times\n4 procs"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "yukihanashopping0212@gmail.com",
            "name": "flipslidersand"
          },
          "committer": {
            "email": "yukihanashopping0212@gmail.com",
            "name": "flipslidersand"
          },
          "distinct": true,
          "id": "3c4afea6305638ea6a3a5e60904369946406052e",
          "message": "ci: add TestDataPath_XDG to Windows skip list (Unix-only path test)",
          "timestamp": "2026-08-23T18:34:06+09:00",
          "tree_id": "4074fe07d216bd28a48c084a48efd536886db63f",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/3c4afea6305638ea6a3a5e60904369946406052e"
        },
        "date": 1787477788352,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3308,
            "unit": "ns/op\t 309.53 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "366206 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3308,
            "unit": "ns/op",
            "extra": "366206 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 309.53,
            "unit": "MB/s",
            "extra": "366206 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "366206 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "366206 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3293,
            "unit": "ns/op\t 310.98 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "360428 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3293,
            "unit": "ns/op",
            "extra": "360428 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 310.98,
            "unit": "MB/s",
            "extra": "360428 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "360428 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "360428 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3359,
            "unit": "ns/op\t 304.87 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "367393 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3359,
            "unit": "ns/op",
            "extra": "367393 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 304.87,
            "unit": "MB/s",
            "extra": "367393 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "367393 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "367393 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 24385,
            "unit": "ns/op\t 671.89 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "48811 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 24385,
            "unit": "ns/op",
            "extra": "48811 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 671.89,
            "unit": "MB/s",
            "extra": "48811 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "48811 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "48811 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 24394,
            "unit": "ns/op\t 671.65 MB/s\t      37 B/op\t       3 allocs/op",
            "extra": "48727 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 24394,
            "unit": "ns/op",
            "extra": "48727 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 671.65,
            "unit": "MB/s",
            "extra": "48727 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "48727 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "48727 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 24296,
            "unit": "ns/op\t 674.34 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "50340 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 24296,
            "unit": "ns/op",
            "extra": "50340 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 674.34,
            "unit": "MB/s",
            "extra": "50340 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "50340 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "50340 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 88740,
            "unit": "ns/op\t 738.52 MB/s\t      83 B/op\t       6 allocs/op",
            "extra": "13376 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 88740,
            "unit": "ns/op",
            "extra": "13376 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 738.52,
            "unit": "MB/s",
            "extra": "13376 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 83,
            "unit": "B/op",
            "extra": "13376 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "13376 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 92295,
            "unit": "ns/op\t 710.07 MB/s\t      89 B/op\t       6 allocs/op",
            "extra": "13305 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 92295,
            "unit": "ns/op",
            "extra": "13305 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 710.07,
            "unit": "MB/s",
            "extra": "13305 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 89,
            "unit": "B/op",
            "extra": "13305 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "13305 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 92214,
            "unit": "ns/op\t 710.69 MB/s\t      83 B/op\t       6 allocs/op",
            "extra": "13407 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 92214,
            "unit": "ns/op",
            "extra": "13407 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 710.69,
            "unit": "MB/s",
            "extra": "13407 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 83,
            "unit": "B/op",
            "extra": "13407 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "13407 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 345662,
            "unit": "ns/op\t 758.38 MB/s\t     256 B/op\t      15 allocs/op",
            "extra": "3422 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 345662,
            "unit": "ns/op",
            "extra": "3422 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 758.38,
            "unit": "MB/s",
            "extra": "3422 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "3422 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "3422 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 340249,
            "unit": "ns/op\t 770.45 MB/s\t     259 B/op\t      15 allocs/op",
            "extra": "3312 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 340249,
            "unit": "ns/op",
            "extra": "3312 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 770.45,
            "unit": "MB/s",
            "extra": "3312 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 259,
            "unit": "B/op",
            "extra": "3312 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "3312 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 341586,
            "unit": "ns/op\t 767.43 MB/s\t     291 B/op\t      15 allocs/op",
            "extra": "3529 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 341586,
            "unit": "ns/op",
            "extra": "3529 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 767.43,
            "unit": "MB/s",
            "extra": "3529 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 291,
            "unit": "B/op",
            "extra": "3529 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "3529 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1394743,
            "unit": "ns/op\t 751.81 MB/s\t    1773 B/op\t      51 allocs/op",
            "extra": "855 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1394743,
            "unit": "ns/op",
            "extra": "855 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 751.81,
            "unit": "MB/s",
            "extra": "855 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1773,
            "unit": "B/op",
            "extra": "855 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "855 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1394336,
            "unit": "ns/op\t 752.03 MB/s\t    1804 B/op\t      51 allocs/op",
            "extra": "886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1394336,
            "unit": "ns/op",
            "extra": "886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 752.03,
            "unit": "MB/s",
            "extra": "886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1804,
            "unit": "B/op",
            "extra": "886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "886 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1353602,
            "unit": "ns/op\t 774.66 MB/s\t    2049 B/op\t      51 allocs/op",
            "extra": "829 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1353602,
            "unit": "ns/op",
            "extra": "829 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 774.66,
            "unit": "MB/s",
            "extra": "829 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 2049,
            "unit": "B/op",
            "extra": "829 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "829 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 87708,
            "unit": "ns/op\t 747.21 MB/s\t      74 B/op\t       6 allocs/op",
            "extra": "13166 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 87708,
            "unit": "ns/op",
            "extra": "13166 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 747.21,
            "unit": "MB/s",
            "extra": "13166 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 74,
            "unit": "B/op",
            "extra": "13166 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "13166 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 88871,
            "unit": "ns/op\t 737.42 MB/s\t      64 B/op\t       6 allocs/op",
            "extra": "12832 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 88871,
            "unit": "ns/op",
            "extra": "12832 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 737.42,
            "unit": "MB/s",
            "extra": "12832 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 64,
            "unit": "B/op",
            "extra": "12832 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "12832 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 90687,
            "unit": "ns/op\t 722.66 MB/s\t      88 B/op\t       6 allocs/op",
            "extra": "13657 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 90687,
            "unit": "ns/op",
            "extra": "13657 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 722.66,
            "unit": "MB/s",
            "extra": "13657 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 88,
            "unit": "B/op",
            "extra": "13657 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "13657 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 955513,
            "unit": "ns/op\t   26090 B/op\t     321 allocs/op",
            "extra": "1231 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 955513,
            "unit": "ns/op",
            "extra": "1231 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26090,
            "unit": "B/op",
            "extra": "1231 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1231 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 958031,
            "unit": "ns/op\t   26074 B/op\t     321 allocs/op",
            "extra": "1238 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 958031,
            "unit": "ns/op",
            "extra": "1238 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26074,
            "unit": "B/op",
            "extra": "1238 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1238 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 955791,
            "unit": "ns/op\t   26073 B/op\t     321 allocs/op",
            "extra": "1243 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 955791,
            "unit": "ns/op",
            "extra": "1243 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26073,
            "unit": "B/op",
            "extra": "1243 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1243 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1342,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "756942 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1342,
            "unit": "ns/op",
            "extra": "756942 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "756942 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "756942 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1327,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "841561 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1327,
            "unit": "ns/op",
            "extra": "841561 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "841561 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "841561 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1332,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "843861 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1332,
            "unit": "ns/op",
            "extra": "843861 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "843861 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "843861 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15713,
            "unit": "ns/op\t      38 B/op\t       3 allocs/op",
            "extra": "75379 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15713,
            "unit": "ns/op",
            "extra": "75379 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 38,
            "unit": "B/op",
            "extra": "75379 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "75379 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15682,
            "unit": "ns/op\t      39 B/op\t       3 allocs/op",
            "extra": "75830 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15682,
            "unit": "ns/op",
            "extra": "75830 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 39,
            "unit": "B/op",
            "extra": "75830 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "75830 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15733,
            "unit": "ns/op\t      40 B/op\t       3 allocs/op",
            "extra": "75681 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15733,
            "unit": "ns/op",
            "extra": "75681 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 40,
            "unit": "B/op",
            "extra": "75681 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "75681 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 44976,
            "unit": "ns/op\t1457.15 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "26205 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 44976,
            "unit": "ns/op",
            "extra": "26205 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1457.15,
            "unit": "MB/s",
            "extra": "26205 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "26205 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "26205 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 46621,
            "unit": "ns/op\t1405.71 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "26506 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 46621,
            "unit": "ns/op",
            "extra": "26506 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1405.71,
            "unit": "MB/s",
            "extra": "26506 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "26506 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "26506 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 44743,
            "unit": "ns/op\t1464.71 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "26562 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 44743,
            "unit": "ns/op",
            "extra": "26562 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1464.71,
            "unit": "MB/s",
            "extra": "26562 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "26562 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "26562 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 195577,
            "unit": "ns/op\t5361.44 MB/s\t   48626 B/op\t     175 allocs/op",
            "extra": "6225 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 195577,
            "unit": "ns/op",
            "extra": "6225 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5361.44,
            "unit": "MB/s",
            "extra": "6225 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48626,
            "unit": "B/op",
            "extra": "6225 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6225 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 193724,
            "unit": "ns/op\t5412.73 MB/s\t   48626 B/op\t     175 allocs/op",
            "extra": "6326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 193724,
            "unit": "ns/op",
            "extra": "6326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5412.73,
            "unit": "MB/s",
            "extra": "6326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48626,
            "unit": "B/op",
            "extra": "6326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 194713,
            "unit": "ns/op\t5385.25 MB/s\t   48626 B/op\t     175 allocs/op",
            "extra": "6254 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 194713,
            "unit": "ns/op",
            "extra": "6254 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5385.25,
            "unit": "MB/s",
            "extra": "6254 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48626,
            "unit": "B/op",
            "extra": "6254 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6254 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2227825,
            "unit": "ns/op\t7530.76 MB/s\t  179927 B/op\t    2115 allocs/op",
            "extra": "534 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2227825,
            "unit": "ns/op",
            "extra": "534 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 7530.76,
            "unit": "MB/s",
            "extra": "534 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179927,
            "unit": "B/op",
            "extra": "534 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "534 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2224193,
            "unit": "ns/op\t7543.06 MB/s\t  179920 B/op\t    2115 allocs/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2224193,
            "unit": "ns/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 7543.06,
            "unit": "MB/s",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179920,
            "unit": "B/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "524 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2230100,
            "unit": "ns/op\t7523.08 MB/s\t  179935 B/op\t    2115 allocs/op",
            "extra": "520 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2230100,
            "unit": "ns/op",
            "extra": "520 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 7523.08,
            "unit": "MB/s",
            "extra": "520 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179935,
            "unit": "B/op",
            "extra": "520 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "520 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1037,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1037,
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
            "value": 1040,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1040,
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
            "value": 1031,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1031,
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
            "value": 379.3,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3144280 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 379.3,
            "unit": "ns/op",
            "extra": "3144280 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3144280 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3144280 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 377.7,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3146643 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 377.7,
            "unit": "ns/op",
            "extra": "3146643 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3146643 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3146643 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 378.9,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3143847 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 378.9,
            "unit": "ns/op",
            "extra": "3143847 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3143847 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3143847 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1349,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "837109 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1349,
            "unit": "ns/op",
            "extra": "837109 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "837109 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "837109 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1346,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "843964 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1346,
            "unit": "ns/op",
            "extra": "843964 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "843964 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "843964 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1348,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "860781 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1348,
            "unit": "ns/op",
            "extra": "860781 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "860781 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "860781 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1138131,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1138131,
            "unit": "ns/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1136985,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1136985,
            "unit": "ns/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1050 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1140310,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1042 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1140310,
            "unit": "ns/op",
            "extra": "1042 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1042 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1042 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 242.7,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4984155 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 242.7,
            "unit": "ns/op",
            "extra": "4984155 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4984155 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4984155 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 238.8,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "5000485 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 238.8,
            "unit": "ns/op",
            "extra": "5000485 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "5000485 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "5000485 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 241.8,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4984297 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 241.8,
            "unit": "ns/op",
            "extra": "4984297 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4984297 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4984297 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 48.7,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24144604 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 48.7,
            "unit": "ns/op",
            "extra": "24144604 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24144604 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24144604 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 48.5,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24034903 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 48.5,
            "unit": "ns/op",
            "extra": "24034903 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24034903 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24034903 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 48.15,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "24677278 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 48.15,
            "unit": "ns/op",
            "extra": "24677278 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "24677278 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "24677278 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 83.26,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "14594006 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 83.26,
            "unit": "ns/op",
            "extra": "14594006 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "14594006 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "14594006 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 83.84,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "13927299 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 83.84,
            "unit": "ns/op",
            "extra": "13927299 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "13927299 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "13927299 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 83.46,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "14147902 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 83.46,
            "unit": "ns/op",
            "extra": "14147902 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "14147902 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "14147902 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 159.9,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7544127 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 159.9,
            "unit": "ns/op",
            "extra": "7544127 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7544127 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7544127 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 161,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7646872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 161,
            "unit": "ns/op",
            "extra": "7646872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7646872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7646872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 158.6,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "7569487 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 158.6,
            "unit": "ns/op",
            "extra": "7569487 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "7569487 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "7569487 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 630.8,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1874480 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 630.8,
            "unit": "ns/op",
            "extra": "1874480 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1874480 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1874480 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 626.3,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1878674 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 626.3,
            "unit": "ns/op",
            "extra": "1878674 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1878674 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1878674 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 637.7,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "1889342 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 637.7,
            "unit": "ns/op",
            "extra": "1889342 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "1889342 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "1889342 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 699661,
            "unit": "ns/op\t  40.98 MB/s\t 2347059 B/op\t      48 allocs/op",
            "extra": "1842 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 699661,
            "unit": "ns/op",
            "extra": "1842 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 40.98,
            "unit": "MB/s",
            "extra": "1842 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347059,
            "unit": "B/op",
            "extra": "1842 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1842 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 734095,
            "unit": "ns/op\t  39.06 MB/s\t 2347059 B/op\t      48 allocs/op",
            "extra": "1600 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 734095,
            "unit": "ns/op",
            "extra": "1600 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 39.06,
            "unit": "MB/s",
            "extra": "1600 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347059,
            "unit": "B/op",
            "extra": "1600 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1600 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 737073,
            "unit": "ns/op\t  38.90 MB/s\t 2347059 B/op\t      48 allocs/op",
            "extra": "1480 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 737073,
            "unit": "ns/op",
            "extra": "1480 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 38.9,
            "unit": "MB/s",
            "extra": "1480 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347059,
            "unit": "B/op",
            "extra": "1480 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1480 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1861906,
            "unit": "ns/op\t 563.17 MB/s\t 5241146 B/op\t      28 allocs/op",
            "extra": "646 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1861906,
            "unit": "ns/op",
            "extra": "646 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 563.17,
            "unit": "MB/s",
            "extra": "646 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241146,
            "unit": "B/op",
            "extra": "646 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "646 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1984225,
            "unit": "ns/op\t 528.46 MB/s\t 5241149 B/op\t      28 allocs/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1984225,
            "unit": "ns/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 528.46,
            "unit": "MB/s",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241149,
            "unit": "B/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1868651,
            "unit": "ns/op\t 561.14 MB/s\t 5241153 B/op\t      28 allocs/op",
            "extra": "607 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1868651,
            "unit": "ns/op",
            "extra": "607 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 561.14,
            "unit": "MB/s",
            "extra": "607 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241153,
            "unit": "B/op",
            "extra": "607 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "607 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1967521,
            "unit": "ns/op\t 532.94 MB/s\t 5241194 B/op\t      29 allocs/op",
            "extra": "621 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1967521,
            "unit": "ns/op",
            "extra": "621 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 532.94,
            "unit": "MB/s",
            "extra": "621 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241194,
            "unit": "B/op",
            "extra": "621 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "621 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2090035,
            "unit": "ns/op\t 501.70 MB/s\t 5241200 B/op\t      29 allocs/op",
            "extra": "595 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2090035,
            "unit": "ns/op",
            "extra": "595 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 501.7,
            "unit": "MB/s",
            "extra": "595 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241200,
            "unit": "B/op",
            "extra": "595 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "595 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1936134,
            "unit": "ns/op\t 541.58 MB/s\t 5241197 B/op\t      29 allocs/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1936134,
            "unit": "ns/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 541.58,
            "unit": "MB/s",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241197,
            "unit": "B/op",
            "extra": "576 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "576 times\n4 procs"
          }
        ]
      },
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
          "id": "3faf2722d89f46de6cb9371eb5ae2113d6595a2d",
          "message": "fix(config): use filepath.ToSlash in TestDataPath_XDG for Windows compat (#463)\n\nfilepath.Join on Windows produces backslashes, causing the hardcoded\nforward-slash want string to mismatch. Compare via ToSlash on both sides.\n\nCo-authored-by: flipslidersand <yukihanashopping0212@gmail.com>\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T18:36:03+09:00",
          "tree_id": "aa144fd66cb52f5ae487ec414b6dd2b8e9a31d04",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/3faf2722d89f46de6cb9371eb5ae2113d6595a2d"
        },
        "date": 1787477905231,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3068,
            "unit": "ns/op\t 333.78 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "383146 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3068,
            "unit": "ns/op",
            "extra": "383146 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 333.78,
            "unit": "MB/s",
            "extra": "383146 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "383146 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "383146 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3089,
            "unit": "ns/op\t 331.55 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "383838 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3089,
            "unit": "ns/op",
            "extra": "383838 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 331.55,
            "unit": "MB/s",
            "extra": "383838 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "383838 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "383838 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3169,
            "unit": "ns/op\t 323.14 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "383582 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3169,
            "unit": "ns/op",
            "extra": "383582 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 323.14,
            "unit": "MB/s",
            "extra": "383582 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "383582 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "383582 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21228,
            "unit": "ns/op\t 771.80 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "56454 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21228,
            "unit": "ns/op",
            "extra": "56454 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 771.8,
            "unit": "MB/s",
            "extra": "56454 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "56454 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "56454 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21235,
            "unit": "ns/op\t 771.56 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "56562 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21235,
            "unit": "ns/op",
            "extra": "56562 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 771.56,
            "unit": "MB/s",
            "extra": "56562 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "56562 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "56562 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21205,
            "unit": "ns/op\t 772.64 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "57229 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21205,
            "unit": "ns/op",
            "extra": "57229 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 772.64,
            "unit": "MB/s",
            "extra": "57229 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "57229 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "57229 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 76284,
            "unit": "ns/op\t 859.11 MB/s\t      76 B/op\t       6 allocs/op",
            "extra": "15895 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 76284,
            "unit": "ns/op",
            "extra": "15895 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 859.11,
            "unit": "MB/s",
            "extra": "15895 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 76,
            "unit": "B/op",
            "extra": "15895 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15895 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 74496,
            "unit": "ns/op\t 879.72 MB/s\t      84 B/op\t       6 allocs/op",
            "extra": "16014 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 74496,
            "unit": "ns/op",
            "extra": "16014 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 879.72,
            "unit": "MB/s",
            "extra": "16014 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "16014 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "16014 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75483,
            "unit": "ns/op\t 868.22 MB/s\t      80 B/op\t       6 allocs/op",
            "extra": "15980 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75483,
            "unit": "ns/op",
            "extra": "15980 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 868.22,
            "unit": "MB/s",
            "extra": "15980 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 80,
            "unit": "B/op",
            "extra": "15980 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15980 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 247339,
            "unit": "ns/op\t1059.86 MB/s\t     229 B/op\t      15 allocs/op",
            "extra": "4738 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 247339,
            "unit": "ns/op",
            "extra": "4738 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1059.86,
            "unit": "MB/s",
            "extra": "4738 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 229,
            "unit": "B/op",
            "extra": "4738 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4738 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 248555,
            "unit": "ns/op\t1054.67 MB/s\t     247 B/op\t      15 allocs/op",
            "extra": "4500 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 248555,
            "unit": "ns/op",
            "extra": "4500 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1054.67,
            "unit": "MB/s",
            "extra": "4500 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 247,
            "unit": "B/op",
            "extra": "4500 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4500 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 246390,
            "unit": "ns/op\t1063.94 MB/s\t     258 B/op\t      15 allocs/op",
            "extra": "4714 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 246390,
            "unit": "ns/op",
            "extra": "4714 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1063.94,
            "unit": "MB/s",
            "extra": "4714 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 258,
            "unit": "B/op",
            "extra": "4714 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4714 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 951321,
            "unit": "ns/op\t1102.23 MB/s\t    1432 B/op\t      51 allocs/op",
            "extra": "1257 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 951321,
            "unit": "ns/op",
            "extra": "1257 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1102.23,
            "unit": "MB/s",
            "extra": "1257 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1432,
            "unit": "B/op",
            "extra": "1257 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1257 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 958708,
            "unit": "ns/op\t1093.74 MB/s\t    1379 B/op\t      51 allocs/op",
            "extra": "1258 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 958708,
            "unit": "ns/op",
            "extra": "1258 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1093.74,
            "unit": "MB/s",
            "extra": "1258 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1379,
            "unit": "B/op",
            "extra": "1258 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1258 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 949730,
            "unit": "ns/op\t1104.08 MB/s\t    1390 B/op\t      51 allocs/op",
            "extra": "1243 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 949730,
            "unit": "ns/op",
            "extra": "1243 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1104.08,
            "unit": "MB/s",
            "extra": "1243 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1390,
            "unit": "B/op",
            "extra": "1243 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1243 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75162,
            "unit": "ns/op\t 871.93 MB/s\t      72 B/op\t       6 allocs/op",
            "extra": "15858 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75162,
            "unit": "ns/op",
            "extra": "15858 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 871.93,
            "unit": "MB/s",
            "extra": "15858 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 72,
            "unit": "B/op",
            "extra": "15858 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15858 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 74702,
            "unit": "ns/op\t 877.30 MB/s\t      76 B/op\t       6 allocs/op",
            "extra": "15908 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 74702,
            "unit": "ns/op",
            "extra": "15908 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 877.3,
            "unit": "MB/s",
            "extra": "15908 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 76,
            "unit": "B/op",
            "extra": "15908 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15908 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 76226,
            "unit": "ns/op\t 859.76 MB/s\t      68 B/op\t       6 allocs/op",
            "extra": "15847 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 76226,
            "unit": "ns/op",
            "extra": "15847 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 859.76,
            "unit": "MB/s",
            "extra": "15847 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 68,
            "unit": "B/op",
            "extra": "15847 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15847 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1240598,
            "unit": "ns/op\t   26082 B/op\t     321 allocs/op",
            "extra": "968 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1240598,
            "unit": "ns/op",
            "extra": "968 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26082,
            "unit": "B/op",
            "extra": "968 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "968 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1241773,
            "unit": "ns/op\t   26081 B/op\t     321 allocs/op",
            "extra": "946 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1241773,
            "unit": "ns/op",
            "extra": "946 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26081,
            "unit": "B/op",
            "extra": "946 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "946 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1230438,
            "unit": "ns/op\t   26069 B/op\t     321 allocs/op",
            "extra": "949 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1230438,
            "unit": "ns/op",
            "extra": "949 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26069,
            "unit": "B/op",
            "extra": "949 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "949 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1394,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "765636 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1394,
            "unit": "ns/op",
            "extra": "765636 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "765636 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "765636 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1384,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "784784 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1384,
            "unit": "ns/op",
            "extra": "784784 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "784784 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "784784 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1384,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "789165 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1384,
            "unit": "ns/op",
            "extra": "789165 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "789165 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "789165 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14421,
            "unit": "ns/op\t      39 B/op\t       3 allocs/op",
            "extra": "82171 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14421,
            "unit": "ns/op",
            "extra": "82171 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 39,
            "unit": "B/op",
            "extra": "82171 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "82171 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14517,
            "unit": "ns/op\t      41 B/op\t       3 allocs/op",
            "extra": "82039 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14517,
            "unit": "ns/op",
            "extra": "82039 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 41,
            "unit": "B/op",
            "extra": "82039 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "82039 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14451,
            "unit": "ns/op\t      38 B/op\t       3 allocs/op",
            "extra": "82147 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14451,
            "unit": "ns/op",
            "extra": "82147 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 38,
            "unit": "B/op",
            "extra": "82147 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "82147 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53391,
            "unit": "ns/op\t1227.48 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22579 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53391,
            "unit": "ns/op",
            "extra": "22579 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1227.48,
            "unit": "MB/s",
            "extra": "22579 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22579 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22579 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 52953,
            "unit": "ns/op\t1237.62 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22558 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 52953,
            "unit": "ns/op",
            "extra": "22558 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1237.62,
            "unit": "MB/s",
            "extra": "22558 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22558 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22558 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53197,
            "unit": "ns/op\t1231.94 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "21555 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53197,
            "unit": "ns/op",
            "extra": "21555 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1231.94,
            "unit": "MB/s",
            "extra": "21555 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "21555 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "21555 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 288561,
            "unit": "ns/op\t3633.81 MB/s\t   48628 B/op\t     175 allocs/op",
            "extra": "4308 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 288561,
            "unit": "ns/op",
            "extra": "4308 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3633.81,
            "unit": "MB/s",
            "extra": "4308 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48628,
            "unit": "B/op",
            "extra": "4308 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4308 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 291985,
            "unit": "ns/op\t3591.20 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "4308 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 291985,
            "unit": "ns/op",
            "extra": "4308 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3591.2,
            "unit": "MB/s",
            "extra": "4308 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "4308 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4308 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 288612,
            "unit": "ns/op\t3633.16 MB/s\t   48625 B/op\t     175 allocs/op",
            "extra": "4153 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 288612,
            "unit": "ns/op",
            "extra": "4153 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3633.16,
            "unit": "MB/s",
            "extra": "4153 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48625,
            "unit": "B/op",
            "extra": "4153 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4153 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3577940,
            "unit": "ns/op\t4689.07 MB/s\t  179932 B/op\t    2115 allocs/op",
            "extra": "326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3577940,
            "unit": "ns/op",
            "extra": "326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4689.07,
            "unit": "MB/s",
            "extra": "326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179932,
            "unit": "B/op",
            "extra": "326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3597800,
            "unit": "ns/op\t4663.19 MB/s\t  179926 B/op\t    2115 allocs/op",
            "extra": "327 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3597800,
            "unit": "ns/op",
            "extra": "327 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4663.19,
            "unit": "MB/s",
            "extra": "327 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179926,
            "unit": "B/op",
            "extra": "327 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "327 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3567067,
            "unit": "ns/op\t4703.36 MB/s\t  179932 B/op\t    2115 allocs/op",
            "extra": "326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3567067,
            "unit": "ns/op",
            "extra": "326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4703.36,
            "unit": "MB/s",
            "extra": "326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179932,
            "unit": "B/op",
            "extra": "326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "326 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 910.9,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1309022 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 910.9,
            "unit": "ns/op",
            "extra": "1309022 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1309022 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1309022 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 905.6,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1311147 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 905.6,
            "unit": "ns/op",
            "extra": "1311147 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1311147 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1311147 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 894.6,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1311757 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 894.6,
            "unit": "ns/op",
            "extra": "1311757 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1311757 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1311757 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 374.5,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3206307 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 374.5,
            "unit": "ns/op",
            "extra": "3206307 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3206307 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3206307 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 374.4,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3204122 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 374.4,
            "unit": "ns/op",
            "extra": "3204122 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3204122 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3204122 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 374.8,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3204433 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 374.8,
            "unit": "ns/op",
            "extra": "3204433 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3204433 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3204433 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1343,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "810855 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1343,
            "unit": "ns/op",
            "extra": "810855 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "810855 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "810855 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1345,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "789489 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1345,
            "unit": "ns/op",
            "extra": "789489 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "789489 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "789489 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1340,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "823044 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1340,
            "unit": "ns/op",
            "extra": "823044 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "823044 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "823044 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1137527,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1029 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1137527,
            "unit": "ns/op",
            "extra": "1029 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1029 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1029 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1134388,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1023 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1134388,
            "unit": "ns/op",
            "extra": "1023 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1023 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1023 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1138284,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1035 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1138284,
            "unit": "ns/op",
            "extra": "1035 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1035 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1035 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 238,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "5003658 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 238,
            "unit": "ns/op",
            "extra": "5003658 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "5003658 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "5003658 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 238,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4957378 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 238,
            "unit": "ns/op",
            "extra": "4957378 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4957378 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4957378 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 237.7,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4961210 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 237.7,
            "unit": "ns/op",
            "extra": "4961210 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4961210 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4961210 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 44.26,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "26446561 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 44.26,
            "unit": "ns/op",
            "extra": "26446561 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "26446561 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "26446561 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 44.07,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "26784492 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 44.07,
            "unit": "ns/op",
            "extra": "26784492 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "26784492 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "26784492 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 44.54,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "27244375 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 44.54,
            "unit": "ns/op",
            "extra": "27244375 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "27244375 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "27244375 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 74.35,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "15709437 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 74.35,
            "unit": "ns/op",
            "extra": "15709437 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "15709437 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "15709437 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 74,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "16739832 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 74,
            "unit": "ns/op",
            "extra": "16739832 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "16739832 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "16739832 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 73.39,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "16283786 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 73.39,
            "unit": "ns/op",
            "extra": "16283786 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "16283786 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "16283786 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 130.8,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "9160682 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 130.8,
            "unit": "ns/op",
            "extra": "9160682 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "9160682 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "9160682 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 133.4,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "9077650 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 133.4,
            "unit": "ns/op",
            "extra": "9077650 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "9077650 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "9077650 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 132.2,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "8993751 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 132.2,
            "unit": "ns/op",
            "extra": "8993751 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "8993751 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "8993751 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 505.2,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2373974 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 505.2,
            "unit": "ns/op",
            "extra": "2373974 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2373974 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2373974 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 502.5,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2304030 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 502.5,
            "unit": "ns/op",
            "extra": "2304030 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2304030 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2304030 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 504.5,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2372845 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 504.5,
            "unit": "ns/op",
            "extra": "2372845 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2372845 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2372845 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 500560,
            "unit": "ns/op\t  57.28 MB/s\t 2347060 B/op\t      48 allocs/op",
            "extra": "2479 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 500560,
            "unit": "ns/op",
            "extra": "2479 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 57.28,
            "unit": "MB/s",
            "extra": "2479 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347060,
            "unit": "B/op",
            "extra": "2479 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "2479 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 625438,
            "unit": "ns/op\t  45.84 MB/s\t 2347060 B/op\t      48 allocs/op",
            "extra": "1743 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 625438,
            "unit": "ns/op",
            "extra": "1743 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 45.84,
            "unit": "MB/s",
            "extra": "1743 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347060,
            "unit": "B/op",
            "extra": "1743 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1743 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 706754,
            "unit": "ns/op\t  40.57 MB/s\t 2347063 B/op\t      48 allocs/op",
            "extra": "1593 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 706754,
            "unit": "ns/op",
            "extra": "1593 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 40.57,
            "unit": "MB/s",
            "extra": "1593 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347063,
            "unit": "B/op",
            "extra": "1593 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1593 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1703822,
            "unit": "ns/op\t 615.43 MB/s\t 5241148 B/op\t      28 allocs/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1703822,
            "unit": "ns/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 615.43,
            "unit": "MB/s",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241148,
            "unit": "B/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "637 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1918301,
            "unit": "ns/op\t 546.62 MB/s\t 5241146 B/op\t      28 allocs/op",
            "extra": "664 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1918301,
            "unit": "ns/op",
            "extra": "664 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 546.62,
            "unit": "MB/s",
            "extra": "664 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241146,
            "unit": "B/op",
            "extra": "664 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "664 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1977020,
            "unit": "ns/op\t 530.38 MB/s\t 5241148 B/op\t      28 allocs/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1977020,
            "unit": "ns/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 530.38,
            "unit": "MB/s",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241148,
            "unit": "B/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "596 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1775841,
            "unit": "ns/op\t 590.47 MB/s\t 5241193 B/op\t      29 allocs/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1775841,
            "unit": "ns/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 590.47,
            "unit": "MB/s",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241193,
            "unit": "B/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1986211,
            "unit": "ns/op\t 527.93 MB/s\t 5241196 B/op\t      29 allocs/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1986211,
            "unit": "ns/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 527.93,
            "unit": "MB/s",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241196,
            "unit": "B/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "535 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1766886,
            "unit": "ns/op\t 593.46 MB/s\t 5241194 B/op\t      29 allocs/op",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1766886,
            "unit": "ns/op",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 593.46,
            "unit": "MB/s",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241194,
            "unit": "B/op",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "764 times\n4 procs"
          }
        ]
      },
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
          "id": "95c9b9e9055785a03a524aabe8ef3874bbedc641",
          "message": "feat(transfer): observability — throughput, resume stats, chunk skew, error counters (#269/#270/#274/#275) (#451)\n\n* feat(transfer): observability — throughput log, resume stats, chunk skew, error counters (#269/#270/#274/#275)\n\n#269: add elapsed time and throughput (MB/s) at end of doSendDir/doReceiveDir\n#270: enrich Resume log with skipped chunk count and percentage\n#274: warnChunkSkew() — stderr warning when max:avg chunk ratio ≥ 3.0\n#275: ErrCounter with per-category counts (timeout/conn_reset/hash_mismatch/file_io/other)\n      summary printed to stderr after transfer; zero-error case is silent\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>\n\n* fix(test): check ReadFrom error in chunkskew_test (errcheck lint)\n\n---------\n\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T18:40:15+09:00",
          "tree_id": "cbc17eb839d077d289f668fbe969dbfe9023c6a1",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/95c9b9e9055785a03a524aabe8ef3874bbedc641"
        },
        "date": 1787478160277,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3092,
            "unit": "ns/op\t 331.17 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "384163 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3092,
            "unit": "ns/op",
            "extra": "384163 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 331.17,
            "unit": "MB/s",
            "extra": "384163 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "384163 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "384163 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3125,
            "unit": "ns/op\t 327.65 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "389181 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3125,
            "unit": "ns/op",
            "extra": "389181 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 327.65,
            "unit": "MB/s",
            "extra": "389181 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "389181 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "389181 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3105,
            "unit": "ns/op\t 329.82 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "374900 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3105,
            "unit": "ns/op",
            "extra": "374900 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 329.82,
            "unit": "MB/s",
            "extra": "374900 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "374900 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "374900 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21354,
            "unit": "ns/op\t 767.25 MB/s\t      35 B/op\t       3 allocs/op",
            "extra": "56461 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21354,
            "unit": "ns/op",
            "extra": "56461 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 767.25,
            "unit": "MB/s",
            "extra": "56461 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 35,
            "unit": "B/op",
            "extra": "56461 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "56461 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21305,
            "unit": "ns/op\t 769.00 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "55977 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21305,
            "unit": "ns/op",
            "extra": "55977 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 769,
            "unit": "MB/s",
            "extra": "55977 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "55977 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "55977 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 21351,
            "unit": "ns/op\t 767.35 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "56496 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 21351,
            "unit": "ns/op",
            "extra": "56496 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 767.35,
            "unit": "MB/s",
            "extra": "56496 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "56496 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "56496 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75146,
            "unit": "ns/op\t 872.12 MB/s\t      81 B/op\t       6 allocs/op",
            "extra": "15544 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75146,
            "unit": "ns/op",
            "extra": "15544 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 872.12,
            "unit": "MB/s",
            "extra": "15544 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 81,
            "unit": "B/op",
            "extra": "15544 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15544 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 74062,
            "unit": "ns/op\t 884.88 MB/s\t      80 B/op\t       6 allocs/op",
            "extra": "15674 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 74062,
            "unit": "ns/op",
            "extra": "15674 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 884.88,
            "unit": "MB/s",
            "extra": "15674 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 80,
            "unit": "B/op",
            "extra": "15674 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15674 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 76544,
            "unit": "ns/op\t 856.19 MB/s\t      80 B/op\t       6 allocs/op",
            "extra": "15624 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 76544,
            "unit": "ns/op",
            "extra": "15624 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 856.19,
            "unit": "MB/s",
            "extra": "15624 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 80,
            "unit": "B/op",
            "extra": "15624 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15624 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 246441,
            "unit": "ns/op\t1063.72 MB/s\t     256 B/op\t      15 allocs/op",
            "extra": "4792 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 246441,
            "unit": "ns/op",
            "extra": "4792 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1063.72,
            "unit": "MB/s",
            "extra": "4792 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "4792 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4792 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 246890,
            "unit": "ns/op\t1061.79 MB/s\t     241 B/op\t      15 allocs/op",
            "extra": "4845 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 246890,
            "unit": "ns/op",
            "extra": "4845 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1061.79,
            "unit": "MB/s",
            "extra": "4845 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 241,
            "unit": "B/op",
            "extra": "4845 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4845 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 245124,
            "unit": "ns/op\t1069.43 MB/s\t     255 B/op\t      15 allocs/op",
            "extra": "4831 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 245124,
            "unit": "ns/op",
            "extra": "4831 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1069.43,
            "unit": "MB/s",
            "extra": "4831 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 255,
            "unit": "B/op",
            "extra": "4831 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4831 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 952094,
            "unit": "ns/op\t1101.34 MB/s\t    1519 B/op\t      51 allocs/op",
            "extra": "1212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 952094,
            "unit": "ns/op",
            "extra": "1212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1101.34,
            "unit": "MB/s",
            "extra": "1212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1519,
            "unit": "B/op",
            "extra": "1212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1212 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 943340,
            "unit": "ns/op\t1111.56 MB/s\t    1468 B/op\t      51 allocs/op",
            "extra": "1278 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 943340,
            "unit": "ns/op",
            "extra": "1278 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1111.56,
            "unit": "MB/s",
            "extra": "1278 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1468,
            "unit": "B/op",
            "extra": "1278 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1278 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 949694,
            "unit": "ns/op\t1104.12 MB/s\t    1368 B/op\t      51 allocs/op",
            "extra": "1274 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 949694,
            "unit": "ns/op",
            "extra": "1274 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1104.12,
            "unit": "MB/s",
            "extra": "1274 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1368,
            "unit": "B/op",
            "extra": "1274 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1274 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 75966,
            "unit": "ns/op\t 862.70 MB/s\t      72 B/op\t       6 allocs/op",
            "extra": "15534 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 75966,
            "unit": "ns/op",
            "extra": "15534 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 862.7,
            "unit": "MB/s",
            "extra": "15534 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 72,
            "unit": "B/op",
            "extra": "15534 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15534 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 77147,
            "unit": "ns/op\t 849.49 MB/s\t      81 B/op\t       6 allocs/op",
            "extra": "15294 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 77147,
            "unit": "ns/op",
            "extra": "15294 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 849.49,
            "unit": "MB/s",
            "extra": "15294 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 81,
            "unit": "B/op",
            "extra": "15294 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15294 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 73853,
            "unit": "ns/op\t 887.38 MB/s\t      72 B/op\t       6 allocs/op",
            "extra": "15859 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 73853,
            "unit": "ns/op",
            "extra": "15859 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 887.38,
            "unit": "MB/s",
            "extra": "15859 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 72,
            "unit": "B/op",
            "extra": "15859 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "15859 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1259977,
            "unit": "ns/op\t   26078 B/op\t     321 allocs/op",
            "extra": "952 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1259977,
            "unit": "ns/op",
            "extra": "952 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26078,
            "unit": "B/op",
            "extra": "952 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "952 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1233140,
            "unit": "ns/op\t   26071 B/op\t     321 allocs/op",
            "extra": "960 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1233140,
            "unit": "ns/op",
            "extra": "960 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26071,
            "unit": "B/op",
            "extra": "960 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "960 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1231411,
            "unit": "ns/op\t   26068 B/op\t     321 allocs/op",
            "extra": "945 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1231411,
            "unit": "ns/op",
            "extra": "945 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26068,
            "unit": "B/op",
            "extra": "945 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "945 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1390,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "758948 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1390,
            "unit": "ns/op",
            "extra": "758948 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "758948 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "758948 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1406,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "763458 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1406,
            "unit": "ns/op",
            "extra": "763458 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "763458 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "763458 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1399,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "749872 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1399,
            "unit": "ns/op",
            "extra": "749872 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "749872 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "749872 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14393,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "81690 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14393,
            "unit": "ns/op",
            "extra": "81690 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "81690 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "81690 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14406,
            "unit": "ns/op\t      38 B/op\t       3 allocs/op",
            "extra": "81950 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14406,
            "unit": "ns/op",
            "extra": "81950 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 38,
            "unit": "B/op",
            "extra": "81950 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "81950 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 14467,
            "unit": "ns/op\t      40 B/op\t       3 allocs/op",
            "extra": "81586 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 14467,
            "unit": "ns/op",
            "extra": "81586 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 40,
            "unit": "B/op",
            "extra": "81586 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "81586 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 54182,
            "unit": "ns/op\t1209.54 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22159 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 54182,
            "unit": "ns/op",
            "extra": "22159 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1209.54,
            "unit": "MB/s",
            "extra": "22159 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22159 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22159 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 54321,
            "unit": "ns/op\t1206.45 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "21914 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 54321,
            "unit": "ns/op",
            "extra": "21914 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1206.45,
            "unit": "MB/s",
            "extra": "21914 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "21914 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "21914 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 54478,
            "unit": "ns/op\t1202.98 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22032 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 54478,
            "unit": "ns/op",
            "extra": "22032 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1202.98,
            "unit": "MB/s",
            "extra": "22032 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22032 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22032 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 286090,
            "unit": "ns/op\t3665.20 MB/s\t   48628 B/op\t     175 allocs/op",
            "extra": "4258 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 286090,
            "unit": "ns/op",
            "extra": "4258 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3665.2,
            "unit": "MB/s",
            "extra": "4258 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48628,
            "unit": "B/op",
            "extra": "4258 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4258 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 294830,
            "unit": "ns/op\t3556.54 MB/s\t   48625 B/op\t     175 allocs/op",
            "extra": "3885 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 294830,
            "unit": "ns/op",
            "extra": "3885 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3556.54,
            "unit": "MB/s",
            "extra": "3885 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48625,
            "unit": "B/op",
            "extra": "3885 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "3885 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 318555,
            "unit": "ns/op\t3291.67 MB/s\t   48626 B/op\t     175 allocs/op",
            "extra": "4230 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 318555,
            "unit": "ns/op",
            "extra": "4230 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3291.67,
            "unit": "MB/s",
            "extra": "4230 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48626,
            "unit": "B/op",
            "extra": "4230 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4230 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 4750601,
            "unit": "ns/op\t3531.60 MB/s\t  179920 B/op\t    2115 allocs/op",
            "extra": "253 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 4750601,
            "unit": "ns/op",
            "extra": "253 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3531.6,
            "unit": "MB/s",
            "extra": "253 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179920,
            "unit": "B/op",
            "extra": "253 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "253 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 4637519,
            "unit": "ns/op\t3617.71 MB/s\t  179920 B/op\t    2115 allocs/op",
            "extra": "248 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 4637519,
            "unit": "ns/op",
            "extra": "248 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3617.71,
            "unit": "MB/s",
            "extra": "248 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179920,
            "unit": "B/op",
            "extra": "248 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "248 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 4628386,
            "unit": "ns/op\t3624.85 MB/s\t  179920 B/op\t    2115 allocs/op",
            "extra": "255 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 4628386,
            "unit": "ns/op",
            "extra": "255 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3624.85,
            "unit": "MB/s",
            "extra": "255 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179920,
            "unit": "B/op",
            "extra": "255 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "255 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 911.9,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1294549 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 911.9,
            "unit": "ns/op",
            "extra": "1294549 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1294549 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1294549 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 930.9,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1286050 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 930.9,
            "unit": "ns/op",
            "extra": "1286050 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1286050 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1286050 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 931.1,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1281397 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 931.1,
            "unit": "ns/op",
            "extra": "1281397 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1281397 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1281397 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 382.1,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3152254 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 382.1,
            "unit": "ns/op",
            "extra": "3152254 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3152254 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3152254 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 379.8,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3143980 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 379.8,
            "unit": "ns/op",
            "extra": "3143980 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3143980 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3143980 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 381.2,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "3166124 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 381.2,
            "unit": "ns/op",
            "extra": "3166124 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "3166124 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "3166124 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1380,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "795718 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1380,
            "unit": "ns/op",
            "extra": "795718 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "795718 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "795718 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1372,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "793000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1372,
            "unit": "ns/op",
            "extra": "793000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "793000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "793000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1376,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "782154 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1376,
            "unit": "ns/op",
            "extra": "782154 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "782154 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "782154 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1147960,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1017 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1147960,
            "unit": "ns/op",
            "extra": "1017 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1017 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1017 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1155127,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1018 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1155127,
            "unit": "ns/op",
            "extra": "1018 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1018 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1018 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1148712,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1148712,
            "unit": "ns/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1002 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 241.1,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4954578 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 241.1,
            "unit": "ns/op",
            "extra": "4954578 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4954578 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4954578 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 242.7,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4936239 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 242.7,
            "unit": "ns/op",
            "extra": "4936239 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4936239 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4936239 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 241.4,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4910650 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 241.4,
            "unit": "ns/op",
            "extra": "4910650 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4910650 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4910650 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 46.38,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "26087329 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 46.38,
            "unit": "ns/op",
            "extra": "26087329 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "26087329 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "26087329 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45.59,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "26114697 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45.59,
            "unit": "ns/op",
            "extra": "26114697 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "26114697 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "26114697 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45.05,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "27451717 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45.05,
            "unit": "ns/op",
            "extra": "27451717 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "27451717 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "27451717 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 76.27,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "16150543 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 76.27,
            "unit": "ns/op",
            "extra": "16150543 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "16150543 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "16150543 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 75.57,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "15742917 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 75.57,
            "unit": "ns/op",
            "extra": "15742917 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "15742917 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "15742917 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 75.34,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "16326118 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 75.34,
            "unit": "ns/op",
            "extra": "16326118 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "16326118 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "16326118 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 135.6,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "9175490 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 135.6,
            "unit": "ns/op",
            "extra": "9175490 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "9175490 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "9175490 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 136.3,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "8621799 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 136.3,
            "unit": "ns/op",
            "extra": "8621799 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "8621799 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "8621799 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 135.2,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "8707063 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 135.2,
            "unit": "ns/op",
            "extra": "8707063 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "8707063 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "8707063 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 511.6,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2326809 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 511.6,
            "unit": "ns/op",
            "extra": "2326809 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2326809 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2326809 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 513.5,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2280997 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 513.5,
            "unit": "ns/op",
            "extra": "2280997 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2280997 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2280997 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 512.1,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2334322 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 512.1,
            "unit": "ns/op",
            "extra": "2334322 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2334322 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2334322 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 704213,
            "unit": "ns/op\t  40.71 MB/s\t 2347061 B/op\t      48 allocs/op",
            "extra": "1672 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 704213,
            "unit": "ns/op",
            "extra": "1672 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 40.71,
            "unit": "MB/s",
            "extra": "1672 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347061,
            "unit": "B/op",
            "extra": "1672 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1672 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 872158,
            "unit": "ns/op\t  32.87 MB/s\t 2347064 B/op\t      48 allocs/op",
            "extra": "2371 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 872158,
            "unit": "ns/op",
            "extra": "2371 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 32.87,
            "unit": "MB/s",
            "extra": "2371 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347064,
            "unit": "B/op",
            "extra": "2371 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "2371 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 890341,
            "unit": "ns/op\t  32.20 MB/s\t 2347066 B/op\t      48 allocs/op",
            "extra": "1290 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 890341,
            "unit": "ns/op",
            "extra": "1290 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 32.2,
            "unit": "MB/s",
            "extra": "1290 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347066,
            "unit": "B/op",
            "extra": "1290 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1290 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2152154,
            "unit": "ns/op\t 487.22 MB/s\t 5241151 B/op\t      28 allocs/op",
            "extra": "572 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2152154,
            "unit": "ns/op",
            "extra": "572 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 487.22,
            "unit": "MB/s",
            "extra": "572 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241151,
            "unit": "B/op",
            "extra": "572 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "572 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2252042,
            "unit": "ns/op\t 465.61 MB/s\t 5241149 B/op\t      28 allocs/op",
            "extra": "555 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2252042,
            "unit": "ns/op",
            "extra": "555 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 465.61,
            "unit": "MB/s",
            "extra": "555 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241149,
            "unit": "B/op",
            "extra": "555 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "555 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2159049,
            "unit": "ns/op\t 485.67 MB/s\t 5241146 B/op\t      28 allocs/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2159049,
            "unit": "ns/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 485.67,
            "unit": "MB/s",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241146,
            "unit": "B/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "589 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2208485,
            "unit": "ns/op\t 474.79 MB/s\t 5241196 B/op\t      29 allocs/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2208485,
            "unit": "ns/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 474.79,
            "unit": "MB/s",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241196,
            "unit": "B/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "583 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2299562,
            "unit": "ns/op\t 455.99 MB/s\t 5241196 B/op\t      29 allocs/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2299562,
            "unit": "ns/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 455.99,
            "unit": "MB/s",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241196,
            "unit": "B/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "588 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2276336,
            "unit": "ns/op\t 460.64 MB/s\t 5241196 B/op\t      29 allocs/op",
            "extra": "483 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2276336,
            "unit": "ns/op",
            "extra": "483 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 460.64,
            "unit": "MB/s",
            "extra": "483 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241196,
            "unit": "B/op",
            "extra": "483 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "483 times\n4 procs"
          }
        ]
      },
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
          "id": "fe8a4c25e1b170c2969f19e5534e4a5ec25ad95e",
          "message": "feat(webui): add elapsed_ms/speed_bps/eta_ms to SSE ProgressEvent (#272) (#448)\n\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T19:25:51+09:00",
          "tree_id": "2b21592bda6c334141a24fb3b60b31b51b7ca250",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/fe8a4c25e1b170c2969f19e5534e4a5ec25ad95e"
        },
        "date": 1787480895456,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 3068,
            "unit": "ns/op\t 333.73 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "415888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 3068,
            "unit": "ns/op",
            "extra": "415888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 333.73,
            "unit": "MB/s",
            "extra": "415888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "415888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "415888 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2966,
            "unit": "ns/op\t 345.28 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "401742 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2966,
            "unit": "ns/op",
            "extra": "401742 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 345.28,
            "unit": "MB/s",
            "extra": "401742 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "401742 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "401742 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2923,
            "unit": "ns/op\t 350.31 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "404720 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2923,
            "unit": "ns/op",
            "extra": "404720 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 350.31,
            "unit": "MB/s",
            "extra": "404720 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "404720 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "404720 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17329,
            "unit": "ns/op\t 945.45 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "69542 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17329,
            "unit": "ns/op",
            "extra": "69542 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 945.45,
            "unit": "MB/s",
            "extra": "69542 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "69542 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "69542 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17321,
            "unit": "ns/op\t 945.90 MB/s\t      34 B/op\t       3 allocs/op",
            "extra": "68869 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17321,
            "unit": "ns/op",
            "extra": "68869 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 945.9,
            "unit": "MB/s",
            "extra": "68869 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 34,
            "unit": "B/op",
            "extra": "68869 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "68869 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 17395,
            "unit": "ns/op\t 941.90 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "69446 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 17395,
            "unit": "ns/op",
            "extra": "69446 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 941.9,
            "unit": "MB/s",
            "extra": "69446 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "69446 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "69446 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 63532,
            "unit": "ns/op\t1031.54 MB/s\t      74 B/op\t       6 allocs/op",
            "extra": "18756 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 63532,
            "unit": "ns/op",
            "extra": "18756 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1031.54,
            "unit": "MB/s",
            "extra": "18756 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 74,
            "unit": "B/op",
            "extra": "18756 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18756 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 64031,
            "unit": "ns/op\t1023.51 MB/s\t      78 B/op\t       6 allocs/op",
            "extra": "18843 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 64031,
            "unit": "ns/op",
            "extra": "18843 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1023.51,
            "unit": "MB/s",
            "extra": "18843 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 78,
            "unit": "B/op",
            "extra": "18843 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18843 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 63870,
            "unit": "ns/op\t1026.08 MB/s\t      78 B/op\t       6 allocs/op",
            "extra": "18769 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 63870,
            "unit": "ns/op",
            "extra": "18769 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1026.08,
            "unit": "MB/s",
            "extra": "18769 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 78,
            "unit": "B/op",
            "extra": "18769 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18769 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 252425,
            "unit": "ns/op\t1038.50 MB/s\t     245 B/op\t      15 allocs/op",
            "extra": "4666 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 252425,
            "unit": "ns/op",
            "extra": "4666 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1038.5,
            "unit": "MB/s",
            "extra": "4666 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 245,
            "unit": "B/op",
            "extra": "4666 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4666 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 251464,
            "unit": "ns/op\t1042.47 MB/s\t     243 B/op\t      15 allocs/op",
            "extra": "4765 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 251464,
            "unit": "ns/op",
            "extra": "4765 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1042.47,
            "unit": "MB/s",
            "extra": "4765 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 243,
            "unit": "B/op",
            "extra": "4765 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "4765 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 251953,
            "unit": "ns/op\t1040.45 MB/s\t     229 B/op\t      15 allocs/op",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 251953,
            "unit": "ns/op",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1040.45,
            "unit": "MB/s",
            "extra": "4782 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 229,
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
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1038023,
            "unit": "ns/op\t1010.17 MB/s\t    1589 B/op\t      51 allocs/op",
            "extra": "1131 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1038023,
            "unit": "ns/op",
            "extra": "1131 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1010.17,
            "unit": "MB/s",
            "extra": "1131 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1589,
            "unit": "B/op",
            "extra": "1131 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1131 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1036480,
            "unit": "ns/op\t1011.67 MB/s\t    1507 B/op\t      51 allocs/op",
            "extra": "1159 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1036480,
            "unit": "ns/op",
            "extra": "1159 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1011.67,
            "unit": "MB/s",
            "extra": "1159 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1507,
            "unit": "B/op",
            "extra": "1159 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1159 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1035251,
            "unit": "ns/op\t1012.87 MB/s\t    1502 B/op\t      51 allocs/op",
            "extra": "1165 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1035251,
            "unit": "ns/op",
            "extra": "1165 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1012.87,
            "unit": "MB/s",
            "extra": "1165 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1502,
            "unit": "B/op",
            "extra": "1165 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1165 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 63643,
            "unit": "ns/op\t1029.75 MB/s\t      67 B/op\t       6 allocs/op",
            "extra": "18722 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 63643,
            "unit": "ns/op",
            "extra": "18722 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1029.75,
            "unit": "MB/s",
            "extra": "18722 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 67,
            "unit": "B/op",
            "extra": "18722 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18722 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 63546,
            "unit": "ns/op\t1031.31 MB/s\t      67 B/op\t       6 allocs/op",
            "extra": "18820 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 63546,
            "unit": "ns/op",
            "extra": "18820 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1031.31,
            "unit": "MB/s",
            "extra": "18820 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 67,
            "unit": "B/op",
            "extra": "18820 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18820 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 63637,
            "unit": "ns/op\t1029.85 MB/s\t      67 B/op\t       6 allocs/op",
            "extra": "18769 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 63637,
            "unit": "ns/op",
            "extra": "18769 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1029.85,
            "unit": "MB/s",
            "extra": "18769 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 67,
            "unit": "B/op",
            "extra": "18769 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "18769 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1126507,
            "unit": "ns/op\t   26065 B/op\t     321 allocs/op",
            "extra": "1062 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1126507,
            "unit": "ns/op",
            "extra": "1062 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26065,
            "unit": "B/op",
            "extra": "1062 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1062 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1117659,
            "unit": "ns/op\t   26071 B/op\t     321 allocs/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1117659,
            "unit": "ns/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26071,
            "unit": "B/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1076 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1106091,
            "unit": "ns/op\t   26076 B/op\t     321 allocs/op",
            "extra": "1065 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1106091,
            "unit": "ns/op",
            "extra": "1065 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26076,
            "unit": "B/op",
            "extra": "1065 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1065 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1420,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "765823 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1420,
            "unit": "ns/op",
            "extra": "765823 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "765823 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "765823 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1423,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "781730 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1423,
            "unit": "ns/op",
            "extra": "781730 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "781730 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "781730 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1411,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "782092 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1411,
            "unit": "ns/op",
            "extra": "782092 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "782092 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "782092 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13298,
            "unit": "ns/op\t      37 B/op\t       3 allocs/op",
            "extra": "86673 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13298,
            "unit": "ns/op",
            "extra": "86673 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 37,
            "unit": "B/op",
            "extra": "86673 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "86673 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13324,
            "unit": "ns/op\t      36 B/op\t       3 allocs/op",
            "extra": "88618 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13324,
            "unit": "ns/op",
            "extra": "88618 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 36,
            "unit": "B/op",
            "extra": "88618 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "88618 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 13292,
            "unit": "ns/op\t      36 B/op\t       3 allocs/op",
            "extra": "88170 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 13292,
            "unit": "ns/op",
            "extra": "88170 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 36,
            "unit": "B/op",
            "extra": "88170 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "88170 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53122,
            "unit": "ns/op\t1233.68 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22519 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53122,
            "unit": "ns/op",
            "extra": "22519 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1233.68,
            "unit": "MB/s",
            "extra": "22519 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22519 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22519 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 52856,
            "unit": "ns/op\t1239.90 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22620 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 52856,
            "unit": "ns/op",
            "extra": "22620 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1239.9,
            "unit": "MB/s",
            "extra": "22620 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22620 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22620 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 53070,
            "unit": "ns/op\t1234.90 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "22461 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 53070,
            "unit": "ns/op",
            "extra": "22461 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1234.9,
            "unit": "MB/s",
            "extra": "22461 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "22461 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "22461 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 277264,
            "unit": "ns/op\t3781.86 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "4176 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 277264,
            "unit": "ns/op",
            "extra": "4176 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3781.86,
            "unit": "MB/s",
            "extra": "4176 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "4176 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4176 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 280552,
            "unit": "ns/op\t3737.55 MB/s\t   48628 B/op\t     175 allocs/op",
            "extra": "4047 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 280552,
            "unit": "ns/op",
            "extra": "4047 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3737.55,
            "unit": "MB/s",
            "extra": "4047 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48628,
            "unit": "B/op",
            "extra": "4047 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4047 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 278736,
            "unit": "ns/op\t3761.89 MB/s\t   48625 B/op\t     175 allocs/op",
            "extra": "4274 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 278736,
            "unit": "ns/op",
            "extra": "4274 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 3761.89,
            "unit": "MB/s",
            "extra": "4274 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48625,
            "unit": "B/op",
            "extra": "4274 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "4274 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3343888,
            "unit": "ns/op\t5017.28 MB/s\t  179921 B/op\t    2115 allocs/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3343888,
            "unit": "ns/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5017.28,
            "unit": "MB/s",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179921,
            "unit": "B/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "345 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3659193,
            "unit": "ns/op\t4584.95 MB/s\t  179938 B/op\t    2115 allocs/op",
            "extra": "337 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3659193,
            "unit": "ns/op",
            "extra": "337 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 4584.95,
            "unit": "MB/s",
            "extra": "337 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179938,
            "unit": "B/op",
            "extra": "337 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "337 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 3345848,
            "unit": "ns/op\t5014.34 MB/s\t  179920 B/op\t    2115 allocs/op",
            "extra": "313 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 3345848,
            "unit": "ns/op",
            "extra": "313 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5014.34,
            "unit": "MB/s",
            "extra": "313 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179920,
            "unit": "B/op",
            "extra": "313 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "313 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 932.9,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1248837 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 932.9,
            "unit": "ns/op",
            "extra": "1248837 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1248837 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1248837 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 940.1,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1253462 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 940.1,
            "unit": "ns/op",
            "extra": "1253462 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1253462 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1253462 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 943.6,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1272934 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 943.6,
            "unit": "ns/op",
            "extra": "1272934 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1272934 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1272934 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 452.1,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2630251 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 452.1,
            "unit": "ns/op",
            "extra": "2630251 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2630251 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2630251 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 451.5,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2653099 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 451.5,
            "unit": "ns/op",
            "extra": "2653099 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2653099 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2653099 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 450.3,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "2672076 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 450.3,
            "unit": "ns/op",
            "extra": "2672076 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "2672076 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "2672076 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1482,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "766436 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1482,
            "unit": "ns/op",
            "extra": "766436 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "766436 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "766436 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1482,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "786110 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1482,
            "unit": "ns/op",
            "extra": "786110 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "786110 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "786110 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1481,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "747723 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1481,
            "unit": "ns/op",
            "extra": "747723 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "747723 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "747723 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1279029,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "962 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1279029,
            "unit": "ns/op",
            "extra": "962 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "962 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "962 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1276280,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "938 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1276280,
            "unit": "ns/op",
            "extra": "938 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "938 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "938 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1280108,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "949 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1280108,
            "unit": "ns/op",
            "extra": "949 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "949 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "949 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 282.1,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4257746 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 282.1,
            "unit": "ns/op",
            "extra": "4257746 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4257746 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4257746 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 280,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4248200 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 280,
            "unit": "ns/op",
            "extra": "4248200 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4248200 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4248200 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 277.2,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "4332754 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 277.2,
            "unit": "ns/op",
            "extra": "4332754 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "4332754 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4332754 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45.12,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "26070903 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45.12,
            "unit": "ns/op",
            "extra": "26070903 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "26070903 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "26070903 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 46.01,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "26258170 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 46.01,
            "unit": "ns/op",
            "extra": "26258170 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "26258170 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "26258170 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 45.59,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "26556567 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 45.59,
            "unit": "ns/op",
            "extra": "26556567 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "26556567 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "26556567 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 75.98,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "15284230 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 75.98,
            "unit": "ns/op",
            "extra": "15284230 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "15284230 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "15284230 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 75.51,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "16129825 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 75.51,
            "unit": "ns/op",
            "extra": "16129825 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "16129825 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "16129825 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 76.42,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "15881488 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 76.42,
            "unit": "ns/op",
            "extra": "15881488 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "15881488 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "15881488 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 133.4,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "8553016 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 133.4,
            "unit": "ns/op",
            "extra": "8553016 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "8553016 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "8553016 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 131.1,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "9283872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 131.1,
            "unit": "ns/op",
            "extra": "9283872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "9283872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "9283872 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 131.6,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "9269721 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 131.6,
            "unit": "ns/op",
            "extra": "9269721 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "9269721 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "9269721 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 505.4,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2362408 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 505.4,
            "unit": "ns/op",
            "extra": "2362408 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2362408 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2362408 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 495.1,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2462167 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 495.1,
            "unit": "ns/op",
            "extra": "2462167 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2462167 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2462167 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 506.1,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2357601 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 506.1,
            "unit": "ns/op",
            "extra": "2357601 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2357601 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2357601 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 748897,
            "unit": "ns/op\t  38.29 MB/s\t 2347064 B/op\t      48 allocs/op",
            "extra": "2220 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 748897,
            "unit": "ns/op",
            "extra": "2220 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 38.29,
            "unit": "MB/s",
            "extra": "2220 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347064,
            "unit": "B/op",
            "extra": "2220 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "2220 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 765002,
            "unit": "ns/op\t  37.48 MB/s\t 2347066 B/op\t      48 allocs/op",
            "extra": "1512 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 765002,
            "unit": "ns/op",
            "extra": "1512 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 37.48,
            "unit": "MB/s",
            "extra": "1512 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347066,
            "unit": "B/op",
            "extra": "1512 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1512 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 753150,
            "unit": "ns/op\t  38.07 MB/s\t 2347063 B/op\t      48 allocs/op",
            "extra": "1760 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 753150,
            "unit": "ns/op",
            "extra": "1760 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 38.07,
            "unit": "MB/s",
            "extra": "1760 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347063,
            "unit": "B/op",
            "extra": "1760 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1760 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1934958,
            "unit": "ns/op\t 541.91 MB/s\t 5241152 B/op\t      28 allocs/op",
            "extra": "585 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1934958,
            "unit": "ns/op",
            "extra": "585 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 541.91,
            "unit": "MB/s",
            "extra": "585 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241152,
            "unit": "B/op",
            "extra": "585 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "585 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2077063,
            "unit": "ns/op\t 504.84 MB/s\t 5241149 B/op\t      28 allocs/op",
            "extra": "646 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2077063,
            "unit": "ns/op",
            "extra": "646 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 504.84,
            "unit": "MB/s",
            "extra": "646 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241149,
            "unit": "B/op",
            "extra": "646 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "646 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1957014,
            "unit": "ns/op\t 535.80 MB/s\t 5241149 B/op\t      28 allocs/op",
            "extra": "627 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1957014,
            "unit": "ns/op",
            "extra": "627 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 535.8,
            "unit": "MB/s",
            "extra": "627 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241149,
            "unit": "B/op",
            "extra": "627 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "627 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1830765,
            "unit": "ns/op\t 572.75 MB/s\t 5241197 B/op\t      29 allocs/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1830765,
            "unit": "ns/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 572.75,
            "unit": "MB/s",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241197,
            "unit": "B/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "603 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1754030,
            "unit": "ns/op\t 597.81 MB/s\t 5241197 B/op\t      29 allocs/op",
            "extra": "669 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1754030,
            "unit": "ns/op",
            "extra": "669 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 597.81,
            "unit": "MB/s",
            "extra": "669 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241197,
            "unit": "B/op",
            "extra": "669 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "669 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1899954,
            "unit": "ns/op\t 551.90 MB/s\t 5241196 B/op\t      29 allocs/op",
            "extra": "609 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1899954,
            "unit": "ns/op",
            "extra": "609 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 551.9,
            "unit": "MB/s",
            "extra": "609 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241196,
            "unit": "B/op",
            "extra": "609 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "609 times\n4 procs"
          }
        ]
      },
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
          "id": "8fc89204a7c4e520d80c6d8e1f702a5db98366ff",
          "message": "test(integration): add loopback integration tests for #302 and #304 (#464)\n\n- TestIntegration_SingleFile_Send_Receive (1 MB, 4 chunks)\n- TestIntegration_Directory_Send_Receive (3 files × 512 KB)\n- TestIntegration_Resume_Interrupted (pre-populated checkpoint)\n- TestIntegration_NoResume_IgnoresCheckpoint\n- TestIntegration_ZeroByteFile\n\nAll tests run under //go:build integration and complete in <30 s each.\nTestMain sets a fixed in-process Noise identity so all handshakes use a\nconsistent keypair; sessionPeers stays nil to disable TTY-gated TOFU.\n\nCloses #302, #304\n\nCo-authored-by: flipslidersand <yukihanashopping0212@gmail.com>\nCo-authored-by: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-08-23T19:27:39+09:00",
          "tree_id": "9900365c8f4f6ac4b977ba44ecc1e7d95ab4de17",
          "url": "https://github.com/flipslidersand-labs/mesh-drop/commit/8fc89204a7c4e520d80c6d8e1f702a5db98366ff"
        },
        "date": 1787480999788,
        "tool": "go",
        "benches": [
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2347,
            "unit": "ns/op\t 436.26 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "496958 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2347,
            "unit": "ns/op",
            "extra": "496958 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 436.26,
            "unit": "MB/s",
            "extra": "496958 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "496958 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "496958 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2340,
            "unit": "ns/op\t 437.65 MB/s\t      32 B/op\t       3 allocs/op",
            "extra": "500910 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2340,
            "unit": "ns/op",
            "extra": "500910 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 437.65,
            "unit": "MB/s",
            "extra": "500910 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 32,
            "unit": "B/op",
            "extra": "500910 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "500910 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 2351,
            "unit": "ns/op\t 435.47 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "514767 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 2351,
            "unit": "ns/op",
            "extra": "514767 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 435.47,
            "unit": "MB/s",
            "extra": "514767 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "514767 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "514767 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15752,
            "unit": "ns/op\t1040.15 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "75128 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15752,
            "unit": "ns/op",
            "extra": "75128 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1040.15,
            "unit": "MB/s",
            "extra": "75128 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "75128 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "75128 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15856,
            "unit": "ns/op\t1033.30 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "75848 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15856,
            "unit": "ns/op",
            "extra": "75848 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1033.3,
            "unit": "MB/s",
            "extra": "75848 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "75848 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "75848 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 15828,
            "unit": "ns/op\t1035.11 MB/s\t      33 B/op\t       3 allocs/op",
            "extra": "75774 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 15828,
            "unit": "ns/op",
            "extra": "75774 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1035.11,
            "unit": "MB/s",
            "extra": "75774 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 33,
            "unit": "B/op",
            "extra": "75774 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/16KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "75774 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 57163,
            "unit": "ns/op\t1146.47 MB/s\t      76 B/op\t       6 allocs/op",
            "extra": "21734 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 57163,
            "unit": "ns/op",
            "extra": "21734 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1146.47,
            "unit": "MB/s",
            "extra": "21734 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 76,
            "unit": "B/op",
            "extra": "21734 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21734 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 54962,
            "unit": "ns/op\t1192.39 MB/s\t      70 B/op\t       6 allocs/op",
            "extra": "21816 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 54962,
            "unit": "ns/op",
            "extra": "21816 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1192.39,
            "unit": "MB/s",
            "extra": "21816 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 70,
            "unit": "B/op",
            "extra": "21816 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21816 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 54933,
            "unit": "ns/op\t1193.01 MB/s\t      73 B/op\t       6 allocs/op",
            "extra": "21914 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 54933,
            "unit": "ns/op",
            "extra": "21914 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1193.01,
            "unit": "MB/s",
            "extra": "21914 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 73,
            "unit": "B/op",
            "extra": "21914 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/64KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21914 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 232110,
            "unit": "ns/op\t1129.39 MB/s\t     223 B/op\t      15 allocs/op",
            "extra": "5203 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 232110,
            "unit": "ns/op",
            "extra": "5203 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1129.39,
            "unit": "MB/s",
            "extra": "5203 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 223,
            "unit": "B/op",
            "extra": "5203 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "5203 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 233254,
            "unit": "ns/op\t1123.86 MB/s\t     236 B/op\t      15 allocs/op",
            "extra": "5148 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 233254,
            "unit": "ns/op",
            "extra": "5148 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1123.86,
            "unit": "MB/s",
            "extra": "5148 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 236,
            "unit": "B/op",
            "extra": "5148 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "5148 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 233859,
            "unit": "ns/op\t1120.95 MB/s\t     225 B/op\t      15 allocs/op",
            "extra": "5042 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 233859,
            "unit": "ns/op",
            "extra": "5042 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1120.95,
            "unit": "MB/s",
            "extra": "5042 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 225,
            "unit": "B/op",
            "extra": "5042 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/256KB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 15,
            "unit": "allocs/op",
            "extra": "5042 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 913535,
            "unit": "ns/op\t1147.82 MB/s\t    1502 B/op\t      51 allocs/op",
            "extra": "1302 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 913535,
            "unit": "ns/op",
            "extra": "1302 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1147.82,
            "unit": "MB/s",
            "extra": "1302 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1502,
            "unit": "B/op",
            "extra": "1302 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1302 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 914962,
            "unit": "ns/op\t1146.03 MB/s\t    1550 B/op\t      51 allocs/op",
            "extra": "1305 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 914962,
            "unit": "ns/op",
            "extra": "1305 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1146.03,
            "unit": "MB/s",
            "extra": "1305 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1550,
            "unit": "B/op",
            "extra": "1305 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1305 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 916922,
            "unit": "ns/op\t1143.58 MB/s\t    1516 B/op\t      51 allocs/op",
            "extra": "1282 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 916922,
            "unit": "ns/op",
            "extra": "1282 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1143.58,
            "unit": "MB/s",
            "extra": "1282 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1516,
            "unit": "B/op",
            "extra": "1282 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite/1MB (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 51,
            "unit": "allocs/op",
            "extra": "1282 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 54746,
            "unit": "ns/op\t1197.08 MB/s\t      67 B/op\t       6 allocs/op",
            "extra": "21814 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 54746,
            "unit": "ns/op",
            "extra": "21814 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1197.08,
            "unit": "MB/s",
            "extra": "21814 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 67,
            "unit": "B/op",
            "extra": "21814 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21814 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 54481,
            "unit": "ns/op\t1202.93 MB/s\t      70 B/op\t       6 allocs/op",
            "extra": "21853 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 54481,
            "unit": "ns/op",
            "extra": "21853 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1202.93,
            "unit": "MB/s",
            "extra": "21853 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 70,
            "unit": "B/op",
            "extra": "21853 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21853 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 54987,
            "unit": "ns/op\t1191.84 MB/s\t      79 B/op\t       6 allocs/op",
            "extra": "21915 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 54987,
            "unit": "ns/op",
            "extra": "21915 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - MB/s",
            "value": 1191.84,
            "unit": "MB/s",
            "extra": "21915 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 79,
            "unit": "B/op",
            "extra": "21915 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamRead (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 6,
            "unit": "allocs/op",
            "extra": "21915 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 964798,
            "unit": "ns/op\t   26086 B/op\t     321 allocs/op",
            "extra": "1225 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 964798,
            "unit": "ns/op",
            "extra": "1225 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26086,
            "unit": "B/op",
            "extra": "1225 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1225 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 968186,
            "unit": "ns/op\t   26073 B/op\t     321 allocs/op",
            "extra": "1257 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 968186,
            "unit": "ns/op",
            "extra": "1257 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26073,
            "unit": "B/op",
            "extra": "1257 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1257 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 960822,
            "unit": "ns/op\t   26066 B/op\t     321 allocs/op",
            "extra": "1244 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 960822,
            "unit": "ns/op",
            "extra": "1244 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 26066,
            "unit": "B/op",
            "extra": "1244 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseHandshake (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 321,
            "unit": "allocs/op",
            "extra": "1244 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1072,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "968100 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1072,
            "unit": "ns/op",
            "extra": "968100 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "968100 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "968100 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1056,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1056,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 1062,
            "unit": "ns/op\t    1409 B/op\t      19 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 1062,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 1409,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkDeriveChunkStreamKey (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 19,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 11195,
            "unit": "ns/op\t      38 B/op\t       3 allocs/op",
            "extra": "106118 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 11195,
            "unit": "ns/op",
            "extra": "106118 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 38,
            "unit": "B/op",
            "extra": "106118 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "106118 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 11183,
            "unit": "ns/op\t      36 B/op\t       3 allocs/op",
            "extra": "106018 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 11183,
            "unit": "ns/op",
            "extra": "106018 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 36,
            "unit": "B/op",
            "extra": "106018 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "106018 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto)",
            "value": 11185,
            "unit": "ns/op\t      36 B/op\t       3 allocs/op",
            "extra": "103976 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - ns/op",
            "value": 11185,
            "unit": "ns/op",
            "extra": "103976 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - B/op",
            "value": 36,
            "unit": "B/op",
            "extra": "103976 times\n4 procs"
          },
          {
            "name": "BenchmarkNoiseStreamWrite_Parallel (github.com/flipslidersand/mesh-drop/internal/crypto) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "103976 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 40664,
            "unit": "ns/op\t1611.65 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "29484 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 40664,
            "unit": "ns/op",
            "extra": "29484 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1611.65,
            "unit": "MB/s",
            "extra": "29484 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "29484 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "29484 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 40854,
            "unit": "ns/op\t1604.16 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "29277 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 40854,
            "unit": "ns/op",
            "extra": "29277 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1604.16,
            "unit": "MB/s",
            "extra": "29277 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "29277 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "29277 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 41034,
            "unit": "ns/op\t1597.12 MB/s\t   39600 B/op\t      34 allocs/op",
            "extra": "29376 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 41034,
            "unit": "ns/op",
            "extra": "29376 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 1597.12,
            "unit": "MB/s",
            "extra": "29376 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 39600,
            "unit": "B/op",
            "extra": "29376 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/64KB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 34,
            "unit": "allocs/op",
            "extra": "29376 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 191942,
            "unit": "ns/op\t5462.99 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "6231 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 191942,
            "unit": "ns/op",
            "extra": "6231 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5462.99,
            "unit": "MB/s",
            "extra": "6231 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "6231 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6231 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 191077,
            "unit": "ns/op\t5487.70 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "5551 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 191077,
            "unit": "ns/op",
            "extra": "5551 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5487.7,
            "unit": "MB/s",
            "extra": "5551 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "5551 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "5551 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 194271,
            "unit": "ns/op\t5397.49 MB/s\t   48627 B/op\t     175 allocs/op",
            "extra": "6206 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 194271,
            "unit": "ns/op",
            "extra": "6206 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 5397.49,
            "unit": "MB/s",
            "extra": "6206 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 48627,
            "unit": "B/op",
            "extra": "6206 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/1MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 175,
            "unit": "allocs/op",
            "extra": "6206 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2440159,
            "unit": "ns/op\t6875.46 MB/s\t  179936 B/op\t    2115 allocs/op",
            "extra": "522 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2440159,
            "unit": "ns/op",
            "extra": "522 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 6875.46,
            "unit": "MB/s",
            "extra": "522 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179936,
            "unit": "B/op",
            "extra": "522 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "522 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2293258,
            "unit": "ns/op\t7315.89 MB/s\t  179920 B/op\t    2115 allocs/op",
            "extra": "495 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2293258,
            "unit": "ns/op",
            "extra": "495 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 7315.89,
            "unit": "MB/s",
            "extra": "495 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179920,
            "unit": "B/op",
            "extra": "495 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "495 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 2258651,
            "unit": "ns/op\t7427.98 MB/s\t  179920 B/op\t    2115 allocs/op",
            "extra": "513 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 2258651,
            "unit": "ns/op",
            "extra": "513 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 7427.98,
            "unit": "MB/s",
            "extra": "513 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 179920,
            "unit": "B/op",
            "extra": "513 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader/16MB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 2115,
            "unit": "allocs/op",
            "extra": "513 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 736.7,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1635271 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 736.7,
            "unit": "ns/op",
            "extra": "1635271 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1635271 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1635271 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 722.2,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1630456 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 722.2,
            "unit": "ns/op",
            "extra": "1630456 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1630456 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1630456 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 716.5,
            "unit": "ns/op\t    3384 B/op\t       5 allocs/op",
            "extra": "1655798 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 716.5,
            "unit": "ns/op",
            "extra": "1655798 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 3384,
            "unit": "B/op",
            "extra": "1655798 times\n4 procs"
          },
          {
            "name": "BenchmarkHashReader_SmallChunks (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 5,
            "unit": "allocs/op",
            "extra": "1655798 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 294.7,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "4075809 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 294.7,
            "unit": "ns/op",
            "extra": "4075809 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "4075809 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4075809 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 293.6,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "4056432 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 293.6,
            "unit": "ns/op",
            "extra": "4056432 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "4056432 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4056432 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 293.3,
            "unit": "ns/op\t     180 B/op\t       3 allocs/op",
            "extra": "4082851 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 293.3,
            "unit": "ns/op",
            "extra": "4082851 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 180,
            "unit": "B/op",
            "extra": "4082851 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "4082851 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1063,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1063,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1057,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1057,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1054,
            "unit": "ns/op\t     488 B/op\t      10 allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1054,
            "unit": "ns/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 488,
            "unit": "B/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 10,
            "unit": "allocs/op",
            "extra": "1000000 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 872782,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1374 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 872782,
            "unit": "ns/op",
            "extra": "1374 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1374 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1374 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 872998,
            "unit": "ns/op\t  325113 B/op\t    3024 allocs/op",
            "extra": "1334 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 872998,
            "unit": "ns/op",
            "extra": "1334 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325113,
            "unit": "B/op",
            "extra": "1334 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1334 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 876240,
            "unit": "ns/op\t  325112 B/op\t    3024 allocs/op",
            "extra": "1333 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 876240,
            "unit": "ns/op",
            "extra": "1333 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 325112,
            "unit": "B/op",
            "extra": "1333 times\n4 procs"
          },
          {
            "name": "BenchmarkReadMeta_BatchMode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3024,
            "unit": "allocs/op",
            "extra": "1333 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 188.5,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "6295719 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 188.5,
            "unit": "ns/op",
            "extra": "6295719 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "6295719 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "6295719 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 187,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "6411021 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 187,
            "unit": "ns/op",
            "extra": "6411021 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "6411021 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "6411021 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 186.3,
            "unit": "ns/op\t      84 B/op\t       3 allocs/op",
            "extra": "6407265 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 186.3,
            "unit": "ns/op",
            "extra": "6407265 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 84,
            "unit": "B/op",
            "extra": "6407265 times\n4 procs"
          },
          {
            "name": "BenchmarkWriteChunkMeta (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 3,
            "unit": "allocs/op",
            "extra": "6407265 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 35.06,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "33814122 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 35.06,
            "unit": "ns/op",
            "extra": "33814122 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "33814122 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "33814122 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 35.25,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "34569364 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 35.25,
            "unit": "ns/op",
            "extra": "34569364 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "34569364 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "34569364 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 35.62,
            "unit": "ns/op\t     128 B/op\t       1 allocs/op",
            "extra": "33296874 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 35.62,
            "unit": "ns/op",
            "extra": "33296874 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 128,
            "unit": "B/op",
            "extra": "33296874 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/4chunks_1GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "33296874 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 59.76,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "20304195 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 59.76,
            "unit": "ns/op",
            "extra": "20304195 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "20304195 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "20304195 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 59.4,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "19155320 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 59.4,
            "unit": "ns/op",
            "extra": "19155320 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "19155320 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "19155320 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 58.48,
            "unit": "ns/op\t     256 B/op\t       1 allocs/op",
            "extra": "20128837 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 58.48,
            "unit": "ns/op",
            "extra": "20128837 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 256,
            "unit": "B/op",
            "extra": "20128837 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/8chunks_4GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "20128837 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 103.1,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "11657031 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 103.1,
            "unit": "ns/op",
            "extra": "11657031 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "11657031 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "11657031 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 106.2,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "11064014 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 106.2,
            "unit": "ns/op",
            "extra": "11064014 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "11064014 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "11064014 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 105.3,
            "unit": "ns/op\t     512 B/op\t       1 allocs/op",
            "extra": "11850914 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 105.3,
            "unit": "ns/op",
            "extra": "11850914 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 512,
            "unit": "B/op",
            "extra": "11850914 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/16chunks_8GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "11850914 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 396.9,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "3048274 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 396.9,
            "unit": "ns/op",
            "extra": "3048274 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "3048274 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "3048274 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 399.5,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "3005436 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 399.5,
            "unit": "ns/op",
            "extra": "3005436 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "3005436 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "3005436 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 407.1,
            "unit": "ns/op\t    2048 B/op\t       1 allocs/op",
            "extra": "2922943 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 407.1,
            "unit": "ns/op",
            "extra": "2922943 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2048,
            "unit": "B/op",
            "extra": "2922943 times\n4 procs"
          },
          {
            "name": "BenchmarkAssignChunks/64chunks_16GB (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 1,
            "unit": "allocs/op",
            "extra": "2922943 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 591713,
            "unit": "ns/op\t  48.46 MB/s\t 2347063 B/op\t      48 allocs/op",
            "extra": "2191 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 591713,
            "unit": "ns/op",
            "extra": "2191 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 48.46,
            "unit": "MB/s",
            "extra": "2191 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347063,
            "unit": "B/op",
            "extra": "2191 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "2191 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 642176,
            "unit": "ns/op\t  44.65 MB/s\t 2347064 B/op\t      48 allocs/op",
            "extra": "1778 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 642176,
            "unit": "ns/op",
            "extra": "1778 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 44.65,
            "unit": "MB/s",
            "extra": "1778 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347064,
            "unit": "B/op",
            "extra": "1778 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1778 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 618836,
            "unit": "ns/op\t  46.33 MB/s\t 2347066 B/op\t      48 allocs/op",
            "extra": "1755 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 618836,
            "unit": "ns/op",
            "extra": "1755 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 46.33,
            "unit": "MB/s",
            "extra": "1755 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 2347066,
            "unit": "B/op",
            "extra": "1755 times\n4 procs"
          },
          {
            "name": "BenchmarkZstdEncode (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 48,
            "unit": "allocs/op",
            "extra": "1755 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1451488,
            "unit": "ns/op\t 722.41 MB/s\t 5241147 B/op\t      28 allocs/op",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1451488,
            "unit": "ns/op",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 722.41,
            "unit": "MB/s",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241147,
            "unit": "B/op",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "764 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1266364,
            "unit": "ns/op\t 828.02 MB/s\t 5241143 B/op\t      28 allocs/op",
            "extra": "954 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1266364,
            "unit": "ns/op",
            "extra": "954 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 828.02,
            "unit": "MB/s",
            "extra": "954 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241143,
            "unit": "B/op",
            "extra": "954 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "954 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1368755,
            "unit": "ns/op\t 766.08 MB/s\t 5241148 B/op\t      28 allocs/op",
            "extra": "795 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1368755,
            "unit": "ns/op",
            "extra": "795 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 766.08,
            "unit": "MB/s",
            "extra": "795 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241148,
            "unit": "B/op",
            "extra": "795 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_NoLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 28,
            "unit": "allocs/op",
            "extra": "795 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1346913,
            "unit": "ns/op\t 778.50 MB/s\t 5241192 B/op\t      29 allocs/op",
            "extra": "912 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1346913,
            "unit": "ns/op",
            "extra": "912 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 778.5,
            "unit": "MB/s",
            "extra": "912 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241192,
            "unit": "B/op",
            "extra": "912 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "912 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1437846,
            "unit": "ns/op\t 729.27 MB/s\t 5241195 B/op\t      29 allocs/op",
            "extra": "771 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1437846,
            "unit": "ns/op",
            "extra": "771 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 729.27,
            "unit": "MB/s",
            "extra": "771 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241195,
            "unit": "B/op",
            "extra": "771 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "771 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer)",
            "value": 1459744,
            "unit": "ns/op\t 718.33 MB/s\t 5241195 B/op\t      29 allocs/op",
            "extra": "848 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - ns/op",
            "value": 1459744,
            "unit": "ns/op",
            "extra": "848 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - MB/s",
            "value": 718.33,
            "unit": "MB/s",
            "extra": "848 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - B/op",
            "value": 5241195,
            "unit": "B/op",
            "extra": "848 times\n4 procs"
          },
          {
            "name": "BenchmarkThrottledReader_HighLimit (github.com/flipslidersand/mesh-drop/internal/transfer) - allocs/op",
            "value": 29,
            "unit": "allocs/op",
            "extra": "848 times\n4 procs"
          }
        ]
      }
    ]
  }
}