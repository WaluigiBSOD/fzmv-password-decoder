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

// Functions

function _DecodePassword(Password = "") {
	ValidPassword = false;
	
	if (Password == "")
		Password = document.getElementById("code").value;
	
	Password = Password.toUpperCase();
	
	document.getElementById("code").value = Password;
	
	if (Password.length == 20) {
		var PasswordBuffer;
		var ShuffleKey;
		
		var Temporary;
		
		var Name;
		
		var TotalTime;
		
		var Machine;
		var Track;
		
		var FlagMultiPakMultiplayer;
		
		var TestChecksum = 0;
		
		PasswordBuffer = _Base32ToBuffer(Password);
		
		ShuffleKey = _ExtractShuffleKey(PasswordBuffer);
		
		_UnscrambleBuffer(PasswordBuffer,ShuffleKey);
		
		// Name
		
		Name = _DecompressName(PasswordBuffer);
		
		// Total Time
		
		TotalTime = (PasswordBuffer[6] << 8) | PasswordBuffer[7];
		
		// Machine
		
		Machine = PasswordBuffer[8] % 10;
		
		// Track
		
		Track = Math.floor(PasswordBuffer[8] / 10);
		
		// Multi-Pak Multiplayer
		
		FlagMultiPakMultiplayer = (PasswordBuffer[9] >> 7) & 0x1;
		
		// Checksum
		
		for (var i=0;i<11;i++)
			TestChecksum += PasswordBuffer[i];

		TestChecksum &= 0xFF;
		
		if (TestChecksum == PasswordBuffer[11]) {
			// Name
			
			document.getElementById("name").innerHTML = "";
			
			for (var i=0;i<Name.length;i++) {
				if (PlayerNameAlphabet.indexOf(Name[i]) == -1) {
					_WriteError("Invalid name");
					
					return;
				}
				
				Name[i] = Name[i].charCodeAt(0);
				
				if (Name[i] == 32)
					document.getElementById("name").innerHTML += "<img class=\"name-empty\" src=\"font/" + Name[i] + ".png\">";
				else
					document.getElementById("name").innerHTML += "<img class=\"name\" src=\"font/" + Name[i] + ".png\">";
			}
			
			// Total Time
			
			document.getElementById("time").innerHTML = _FormatTime(TotalTime);
			
			// Machine
			
			document.getElementById("machine").innerHTML = MachineNames[Machine];
			
			// Track
			
			if (Track >= RaceTracks.length) {
				_WriteError("Invalid track");
					
				return;
			}
			
			document.getElementById("track").innerHTML = RaceTracks[Track][0] + " (" + RaceTracks[Track][1] + ")";
			
			// Multi-Pak Multiplayer
			
			if (FlagMultiPakMultiplayer)
				document.getElementById("multiplayer").innerHTML = "True";
			else
				document.getElementById("multiplayer").innerHTML = "False";
			
			// Show result
			
			_ShowResult();
			
			ValidPassword = true;
		} else {
			_WriteError("Invalid checksum");
			
			return;
		}
	} else {
		document.getElementById("code").value = document.getElementById("code").value.toUpperCase();
		
		_WriteError("Enter Rankings password",true);
		
		return;
	}
}