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

function _FormatTime(Time) {
	var TimeCentiSec;
	var TimeSec;
	var TimeMin;
			
	TimeCentiSec = Time % 100;
	TimeSec = Math.floor(Time / 100);
	TimeMin = Math.floor(TimeSec / 60);

	TimeSec %= 60;
	
	while (TimeCentiSec.toString().length < 2)
		TimeCentiSec = "0" + TimeCentiSec;
			
	while (TimeSec.toString().length < 2)
		TimeSec = "0" + TimeSec;
			
	return TimeMin + "' " + TimeSec + "'' " + TimeCentiSec;
}