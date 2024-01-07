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

function _CacheFont() {
	var ImageName;
	
	document.getElementById("cache").innerHTML = "";
	
	for (var i=0;i<PlayerNameAlphabet.length;i++) {
		ImageName = PlayerNameAlphabet.charCodeAt(i);
		
		document.getElementById("cache").innerHTML += "<img class=\"name-cache\" src=\"font/" + ImageName + ".png\">";
	}
}

// To be executed

_CacheFont();