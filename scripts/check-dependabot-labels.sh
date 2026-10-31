#!/usr/bin/env bash
# Verifies that every label referenced in .github/dependabot.yml exists in the
# repository. GitHub silently drops labels dependabot can't find (only a PR
# comment, no CI signal), which can quietly disable dependabot label
# assignment — or worse, block dependabot PR operations like rebase — for a
# long time (see #558). Requires `gh` authenticated (GH_TOKEN/GITHUB_TOKEN).
set -euo pipefail

DEPENDABOT_FILE=".github/dependabot.yml"

if [ ! -f "$DEPENDABOT_FILE" ]; then
	echo "No $DEPENDABOT_FILE, nothing to check."
	exit 0
fi

mapfile -t referenced < <(
	awk '
		/^[[:space:]]*labels:[[:space:]]*$/ { in_labels = 1; next }
		in_labels && /^[[:space:]]*-[[:space:]]+[^[:space:]]/ {
			sub(/^[[:space:]]*-[[:space:]]+/, "")
			sub(/[[:space:]]*#.*$/, "")
			print
			next
		}
		in_labels && !/^[[:space:]]*-/ { in_labels = 0 }
	' "$DEPENDABOT_FILE" | sort -u
)

if [ "${#referenced[@]}" -eq 0 ]; then
	echo "No labels referenced in $DEPENDABOT_FILE."
	exit 0
fi

mapfile -t existing < <(gh label list --limit 200 --json name -q '.[].name')

missing=()
for label in "${referenced[@]}"; do
	found=0
	for e in "${existing[@]}"; do
		if [ "$e" = "$label" ]; then
			found=1
			break
		fi
	done
	if [ "$found" -eq 0 ]; then
		missing+=("$label")
	fi
done

if [ "${#missing[@]}" -gt 0 ]; then
	echo "ERROR: $DEPENDABOT_FILE references labels that don't exist in this repo:"
	printf '  - %s\n' "${missing[@]}"
	echo ""
	echo "Create them with: gh label create <name>"
	exit 1
fi

echo "OK: all labels referenced in $DEPENDABOT_FILE exist (${referenced[*]})"
