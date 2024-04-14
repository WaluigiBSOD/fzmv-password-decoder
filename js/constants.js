// F-Zero: Maximum Velocity Password Decoder
// Copyright (C) 2024-present WaluigiBSOD (waluigibsod.github.io)
//
// This file is part of F-Zero: Maximum Velocity Password Decoder.
//
// F-Zero: Maximum Velocity Password Decoder is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// F-Zero: Maximum Velocity Password Decoder is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

// Constants

const PlayerNameAlphabet		= "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?,.-'&_ /0123456789";

const PasswordBase32Alphabet	= "0123456789A?CEFHJKLMNPQRTVWXY=-+";

// It's "p1_nameNum2typeNum" in the leaked source code of the game.
//
// Actually it's sourced from its comments.

const MachineNames = [
	"Fire Ball",					// Mickey Marcus
	"Sly Joker",					// Lord Cyber
	"Wind Walker",					// Nichi
	"J. B. Crystal",				// Jane B. Christie
	"Hot Violet",					// Megan
	"Falcon MK-II",					// Kent Akechi
	"Silver Thunder",				// Blitz Wagner
	"The Stingray",					// Alexander O'Neil
	"Fighting Comet",				// Kumiko
	"Jet Vermilion"					// Yazoo Jr.
];

// Race Track Entry Format
//
// 0: Title
// 1: Subtitle

const RaceTracks = [
	[
		"Tenth Zone East",			// Title
		"Snake Circuit"				// Subtitle
	],
	
	[
		"Beacon Port",				// Title
		"Crossroad Circuit"			// Subtitle
	],
	
	[
		"Fire Field",				// Title
		"Land Mine Circuit"			// Subtitle
	],
	
	[
		"Cloud Carpet",				// Title
		"Long Jump Circuit"			// Subtitle
	],
	
	[
		"Cloud Carpet",				// Title
		"Icarus Circuit"			// Subtitle
	],
	
	[
		"Ancient Mesa",				// Title
		"Skating Circuit"			// Subtitle
	],
	
	[
		"Bianca City",				// Title
		"Tightrope Circuit"			// Subtitle
	],
	
	[
		"Crater Land",				// Title
		"Loop Circuit"				// Subtitle
	],
	
	[
		"Stark Farm",				// Title
		"First Circuit"				// Subtitle
	],
	
	[
		"Synobazz",					// Title
		"Explosive Circuit"			// Subtitle
	],
	
	[
		"Crater Land",				// Title
		"Skid Zone Circuit"			// Subtitle
	],
	
	[
		"Bianca City",				// Title
		"Stretch Circuit"			// Subtitle
	],
	
	[
		"Empyrean Colony",			// Title
		"Dash Circuit"				// Subtitle
	],
	
	[
		"Empyrean Colony",			// Title
		"Twist Circuit"				// Subtitle
	],
	
	[
		"Stark Farm",				// Title
		"Second Circuit"			// Subtitle
	],
	
	[
		"Ancient Mesa",				// Title
		"Split Circuit"				// Subtitle
	],
	
	[
		"Tenth Zone East",			// Title
		"Plummet Circuit"			// Subtitle
	],
	
	[
		"Fire Field",				// Title
		"Warrior Circuit"			// Subtitle
	],
	
	[
		"Stark Farm",				// Title
		"Third Circuit"				// Subtitle
	],
	
	[
		"Bianca City",				// Title
		"Ultimate Circuit"			// Subtitle
	],
	
	[
		"Synobazz",					// Title
		"Championship Circuit"		// Subtitle
	]
];

// Result Table Entry Format
//
// 0: Caption
// 1: Caption ID (optional)
// 2: Area ID (to be filled by the decoder)

const ResultEntries = [
	[
		"Player Name",				// Caption
		"",							// Caption ID
		"name"						// Area ID
	],
	
	[
		"",							// Caption
		"",							// Caption ID
		""							// Area ID
	],
	
	[
		"Total Time",				// Caption
		"",							// Caption ID
		"time"						// Area ID
	],
	
	[
		"",							// Caption
		"",							// Caption ID
		""							// Area ID
	],
	
	[
		"Machine",					// Caption
		"",							// Caption ID
		"machine"					// Area ID
	],
	
	[
		"Track",					// Caption
		"",							// Caption ID
		"track"						// Area ID
	],
	
	[
		"",							// Caption
		"",							// Caption ID
		""							// Area ID
	],
	
	[
		"Multi-Pak Multiplayer",	// Caption
		"",							// Caption ID
		"multiplayer"				// Area ID
	]
]