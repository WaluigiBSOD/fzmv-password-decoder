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

function _SwapBit(Buffer, IndexX, IndexY) {
	// It's "res_xchg_bit" in the leaked source code of the game.
	
	var ElementX = Math.floor(IndexX / 8);
	var BitX = 7 - (IndexX % 8);
	
	var ElementY = Math.floor(IndexY / 8);
	var BitY = 7 - (IndexY % 8);
	
	// A bit swap is performed only if the bits to swap are different.
	
	if (ElementX < Buffer.length && ElementY < Buffer.length && ((((Buffer[ElementX] & (1 << BitX)) >> BitX) + ((Buffer[ElementY] & (1 << BitY)) >> BitY)) & 0x1)) {
		Buffer[ElementX] ^= 1 << BitX;
		Buffer[ElementY] ^= 1 << BitY;
	}
}

function _SetBit(Buffer, Index) {
	// It's "res_set_bit" in the leaked source code of the game.
	
	var Element = Math.floor(Index / 8);
	var Bit = 7 - (Index % 8);
	
	if (Element < Buffer.length)
		Buffer[Element] |= 1 << Bit;
}

function _Base32ToBuffer(Password) {
	// It's "res_ascii2dat" in the leaked source code of the game.
	
	var retBUFFER = Array(Math.floor(Password.length * Math.log(32) / Math.log(256)) + 1);
	
	var CurrentPasswordCharacter;
	
	var i;
	var j;
	
	for (i=0;i<Password.length;i++) {
		CurrentPasswordCharacter = PasswordBase32Alphabet.indexOf(Password.charAt(i));
		
		for (j=4;j>=0;j--) {
			if (CurrentPasswordCharacter & 0x1)
				_SetBit(retBUFFER,(i * 5) + j);
			
			CurrentPasswordCharacter >>= 1;
		}
	}
	
	return retBUFFER;
}

function _XORBuffer(Buffer, Constant) {
	// It's "res_dat_xor" in the leaked source code of the game.
	//
	// The very last element of the password buffer is in plaintext, must not be altered.
	
	for (var i=0;i<Buffer.length - 1;i++)
		Buffer[i] ^= Constant;
}

function _SelfInvertibleScrambleBits(Buffer, Type) {
	// It's "res_xchg_pattern00","res_xchg_pattern01","res_xchg_pattern02","res_xchg_pattern03", and "res_xchg_pattern04" in the leaked source code of the game.
	//
	// Type parameter matches suffix number from the leaked source code of the game.
	
	var i;
	var j;
	var k;
	
	var ForCycleStep;
	
	switch (Type) {
		// The very last element of the password buffer is in plaintext, must not be altered.
		
		case 0:
		case 1:
			j = Math.floor((Buffer.length - 1) * 8 / 2);
			
			break;
		case 2:
			j = Math.floor((Buffer.length - 1) * 8 / 9);
			
			break;
		case 3:
			j = Math.floor((Buffer.length - 1) * 8 / 8);
			
			break;
		case 4:
			j = Math.floor((Buffer.length - 1) * 8 / 6);
			
			break;
	}
	
	switch (Type) {
		// The very last element of the password buffer is in plaintext, must not be altered.
		
		case 1:
			k = Math.floor((Buffer.length - 1) * 8  - 1);
			
			break;
		default:
			k = j;
			
			break;
	}
	
	switch (Type) {
		case 0:
			ForCycleStep = 2;
			
			break;
		default:
			ForCycleStep = 1;
			
			break;
	}
	
	for (i=0;i<j;i+=ForCycleStep) {
		switch (Type) {
			case 0:
				_SwapBit(Buffer,i,i + j);
				
				break;
			default:
				_SwapBit(Buffer,i,k);
				
				break;
		}
		
		switch (Type) {
			case 1:
				k--;
				
				break;
			case 2:
				k += 8;
				
				break;
			case 3:
				k += 7;
				
				break;
			case 4:
				k += 5;
				
				break;
		}
	}
}

function _UnscrambleBuffer(Buffer, Type) {
	switch (Type) {
		case 0:
			// It's "res_unshufle_00" in the leaked source code of the game.
			
			_SelfInvertibleScrambleBits(Buffer,4);
			_SelfInvertibleScrambleBits(Buffer,3);
			_SelfInvertibleScrambleBits(Buffer,2);
			_XORBuffer(Buffer,0x49);
			_SelfInvertibleScrambleBits(Buffer,1);
			_SelfInvertibleScrambleBits(Buffer,0);
			_XORBuffer(Buffer,0x46);
			
			break;
		case 1:
			// It's "res_unshufle_01" in the leaked source code of the game.
			
			_SelfInvertibleScrambleBits(Buffer,3);
			_SelfInvertibleScrambleBits(Buffer,4);
			_XORBuffer(Buffer,0x5E);
			_SelfInvertibleScrambleBits(Buffer,2);
			_SelfInvertibleScrambleBits(Buffer,0);
			_SelfInvertibleScrambleBits(Buffer,1);
			_XORBuffer(Buffer,0x90);
			
			break;
		case 2:
			// It's "res_unshufle_02" in the leaked source code of the game.
			
			_SelfInvertibleScrambleBits(Buffer,3);
			_SelfInvertibleScrambleBits(Buffer,4);
			_XORBuffer(Buffer,0xE3);
			_SelfInvertibleScrambleBits(Buffer,2);
			_SelfInvertibleScrambleBits(Buffer,0);
			_SelfInvertibleScrambleBits(Buffer,1);
			_XORBuffer(Buffer,0x91);
			
			break;
		case 3:
			// It's "res_unshufle_03" in the leaked source code of the game.
			
			_XORBuffer(Buffer,0x39);
			_SelfInvertibleScrambleBits(Buffer,0);
			_SelfInvertibleScrambleBits(Buffer,3);
			_XORBuffer(Buffer,0x63);
			_SelfInvertibleScrambleBits(Buffer,2);
			_SelfInvertibleScrambleBits(Buffer,0);
			_SelfInvertibleScrambleBits(Buffer,4);
			_XORBuffer(Buffer,0x59);
			
			break;
		case 4:
			// It's "res_unshufle_04" in the leaked source code of the game.
			
			_SelfInvertibleScrambleBits(Buffer,4);
			_SelfInvertibleScrambleBits(Buffer,3);
			_SelfInvertibleScrambleBits(Buffer,2);
			_XORBuffer(Buffer,0xFC);
			_SelfInvertibleScrambleBits(Buffer,1);
			_SelfInvertibleScrambleBits(Buffer,0);
			_XORBuffer(Buffer,0x95);
			
			break;
		case 5:
			// It's "res_unshufle_05" in the leaked source code of the game.
			
			_SelfInvertibleScrambleBits(Buffer,3);
			_SelfInvertibleScrambleBits(Buffer,4);
			_SelfInvertibleScrambleBits(Buffer,2);
			_XORBuffer(Buffer,0x53);
			_SelfInvertibleScrambleBits(Buffer,0);
			_XORBuffer(Buffer,0x4A);
			_SelfInvertibleScrambleBits(Buffer,1);
			_XORBuffer(Buffer,0x4D);
			
			break;
		case 6:
			// It's "res_unshufle_06" in the leaked source code of the game.
			
			_SelfInvertibleScrambleBits(Buffer,0);
			_XORBuffer(Buffer,0x4F);
			_SelfInvertibleScrambleBits(Buffer,2);
			_SelfInvertibleScrambleBits(Buffer,4);
			_XORBuffer(Buffer,0x59);
			_SelfInvertibleScrambleBits(Buffer,3);
			_SelfInvertibleScrambleBits(Buffer,0);
			_SelfInvertibleScrambleBits(Buffer,1);
			_XORBuffer(Buffer,0x41);
			
			break;
		case 7:
			// It's "res_unshufle_07" in the leaked source code of the game.
			
			_SelfInvertibleScrambleBits(Buffer,4);
			_SelfInvertibleScrambleBits(Buffer,3);
			_XORBuffer(Buffer,0x4D);
			_SelfInvertibleScrambleBits(Buffer,1);
			_SelfInvertibleScrambleBits(Buffer,0);
			_XORBuffer(Buffer,0x4F);
			_SelfInvertibleScrambleBits(Buffer,4);
			_SelfInvertibleScrambleBits(Buffer,3);
			_SelfInvertibleScrambleBits(Buffer,2);
			_XORBuffer(Buffer,0x54);
			
			break;
	}
}

function _ExtractShuffleKey(Buffer) {
	// It's "res_extract_key" in the leaked source code of the game.
	//
	// The "shuffle key" is inserted by the game inside the main password by putting
	// 4 bits of plaintext aside, such plaintext bits are stored in the very last
	// element of the password buffer alone, after the shuffle key is recovered
	// they need to be put back in place.
	
	var retKEY = 0;
	
	retKEY |= Buffer[ 0] & 0x80;
	retKEY |= Buffer[ 4] & 0x40;
	retKEY |= Buffer[ 8] & 0x20;
	retKEY |= Buffer[10] & 0x10;
	
	Buffer[ 0] &= ~0x80;
	Buffer[ 4] &= ~0x40;
	Buffer[ 8] &= ~0x20;
	Buffer[10] &= ~0x10;
	
	Buffer[ 0] |= Buffer[12] & 0x80;
	Buffer[ 4] |= Buffer[12] & 0x40;
	Buffer[ 8] |= Buffer[12] & 0x20;
	Buffer[10] |= Buffer[12] & 0x10;
	
	return (retKEY >> 4) & 0x7;
}

function _DecompressName(Buffer) {
	// It's "res_name_unpack" in the leaked source code of the game.
	
	var retNAME = Array(8);
	
	retNAME[0] = Buffer[0] >> 2;
	retNAME[1] = ((Buffer[0] & 0x3) << 4) | ((Buffer[1] >> 4) & 0xF);
	retNAME[2] = ((Buffer[1] & 0xF) << 2) | ((Buffer[2] >> 6) & 0x3);
	retNAME[3] = Buffer[2] & 0x3F;
	retNAME[4] = Buffer[3] >> 2;
	retNAME[5] = ((Buffer[3] & 0x3) << 4) | ((Buffer[4] >> 4) & 0xF);
	retNAME[6] = ((Buffer[4] & 0xF) << 2) | ((Buffer[5] >> 6) & 0x3);
	retNAME[7] = Buffer[5] & 0x3F;
	
	for (var i=0;i<8;i++)
		retNAME[i] = String.fromCharCode((retNAME[i] & 0x3F) + 32);
	
	return retNAME;
}