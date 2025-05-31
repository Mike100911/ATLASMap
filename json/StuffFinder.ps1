# Get path to JSON file in same folder as script
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$jsonPath = Join-Path $scriptDir "islandExtended.json"

# Load and parse JSON once outside the loop for efficiency
try {
    $json = Get-Content $jsonPath -Raw | ConvertFrom-Json
} catch {
    Write-Error "Failed to read or parse $jsonPath. Ensure the file exists and is valid JSON."
    exit
}

while ($true) {
    # Stage 1: Asset or Animal?
    $choice = Read-Host "What do you want to search? Asset = A, Animal = B, or Q to quit"

    if ($choice.ToUpper() -eq "Q") {
        Write-Host "Exiting script. Goodbye!"
        break
    }

    # Stage 2: Get search term
    switch ($choice.ToUpper()) {
        "A" {
            $AssetTerm = Read-Host "Enter part of the Asset name to search for (e.g. 'Cedar', 'Emerald', 'Salt')"
            $AnimalName = $null
        }
        "B" {
            $AnimalName = Read-Host "Enter part of the Animal name to search for (e.g. 'Cat')"
            $AssetTerm = $null
        }
        Default {
            Write-Host "Invalid choice. Please enter 'A', 'B', or 'Q'."
            continue  # Restart the loop
        }
    }

    # Output collection
    $results = @()

    # Iterate through top-level islands ("1", "2", etc.)
    foreach ($key in $json.PSObject.Properties.Name) {
        $entry = $json.$key

        # Match animal (case-insensitive, contains)
        if ($AnimalName -and $entry.animals) {
            $matchedAnimals = $entry.animals |
                Where-Object { $_ -is [string] -and $_.ToLower().Contains($AnimalName.ToLower()) }

            foreach ($matchedAnimal in $matchedAnimals) {
                $results += [PSCustomObject]@{
                    ID   = $key
                    Grid = $entry.grid
                    Type = "Animal"
                    Name = $matchedAnimal
                }
            }
        }

        # Match asset (case-insensitive, contains)
        if ($AssetTerm -and $entry.assets) {
            $matchingAssets = $entry.assets.PSObject.Properties | Where-Object {
                $_.Name.ToLower().Contains($AssetTerm.ToLower())
            }
            foreach ($asset in $matchingAssets) {
                $results += [PSCustomObject]@{
                    ID   = $key
                    Grid = $entry.grid
                    Type = "Asset"
                    Name = $asset.Name
                }
            }
        }
    }

    # Output results
    if ($results.Count -gt 0) {
        $results | Sort-Object ID, Type, Name | Format-Table -AutoSize
    } else {
        Write-Host "No matches found for your input."
    }

    Write-Host ""  # Blank line before next iteration
}
