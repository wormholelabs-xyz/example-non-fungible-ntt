// SPDX-License-Identifier: Apache 2
pragma solidity >=0.8.8 <0.9.0;

import {Test} from "forge-std/Test.sol";
import "../src/libraries/TrimmedAmount.sol";
import "forge-std/console.sol";

contract TrimmingTest is Test {
    using TrimmedAmountLib for uint256;
    using TrimmedAmountLib for TrimmedAmount;

    function testTrimmingRoundTrip() public {
        uint8 decimals = 18;
        uint256 amount = 50 * 10 ** decimals;
        TrimmedAmount memory trimmed = amount.trim(decimals, 8);
        uint256 roundTrip = trimmed.untrim(decimals);

        uint256 expectedAmount = 50 * 10 ** decimals;
        assertEq(expectedAmount, roundTrip);
    }

    function testTrimLessThan8() public {
        uint8 decimals = 7;
        uint8 targetDecimals = 3;
        uint256 amount = 9123412342342;
        TrimmedAmount memory trimmed = amount.trim(decimals, targetDecimals);

        uint64 expectedAmount = 912341234;
        uint8 expectedDecimals = targetDecimals;
        assertEq(trimmed.amount, expectedAmount);
        assertEq(trimmed.decimals, expectedDecimals);
    }

    function testAddOperatorNonZero() public pure {
        uint8[2] memory decimals = [18, 3];
        uint8[2] memory expectedDecimals = [8, 3];

        for (uint8 i = 0; i < decimals.length; i++) {
            uint256 amount = 5 * 10 ** decimals[i];
            uint256 amountOther = 2 * 10 ** decimals[i];
            TrimmedAmount memory trimmedAmount = amount.trim(decimals[i], 8);
            TrimmedAmount memory trimmedAmountOther = amountOther.trim(decimals[i], 8);
            TrimmedAmount memory trimmedSum = trimmedAmount.add(trimmedAmountOther);

            TrimmedAmount memory expectedTrimmedSum =
                TrimmedAmount(uint64(7 * 10 ** uint64(expectedDecimals[i])), expectedDecimals[i]);
            assert(expectedTrimmedSum.eq(trimmedSum));
        }
    }

    function testAddOperatorZero() public pure {
        uint8[2] memory decimals = [18, 3];
        uint8[2] memory expectedDecimals = [8, 3];

        for (uint8 i = 0; i < decimals.length; i++) {
            uint256 amount = 5 * 10 ** decimals[i];
            uint256 amountOther = 0;
            TrimmedAmount memory trimmedAmount = amount.trim(decimals[i], 8);
            TrimmedAmount memory trimmedAmountOther = amountOther.trim(decimals[i], 8);
            TrimmedAmount memory trimmedSum = trimmedAmount.add(trimmedAmountOther);

            TrimmedAmount memory expectedTrimmedSum =
                TrimmedAmount(uint64(5 * 10 ** uint64(expectedDecimals[i])), expectedDecimals[i]);
            assert(expectedTrimmedSum.eq(trimmedSum));
        }
    }

    function testAddOperatorDecimalsNotEqualRevert() public {
        uint8 decimals = 18;
        uint8 decimalsOther = 3;

        uint256 amount = 5 * 10 ** decimals;
        uint256 amountOther = 2 * 10 ** decimalsOther;
        TrimmedAmount memory trimmedAmount = amount.trim(decimals, 8);
        TrimmedAmount memory trimmedAmountOther = amountOther.trim(decimalsOther, 8);

        vm.expectRevert();
        trimmedAmount.add(trimmedAmountOther);
    }

    function testAddOperatorDecimalsNotEqualNoRevert() public pure {
        uint8[2] memory decimals = [18, 10];
        uint8[2] memory expectedDecimals = [8, 8];

        for (uint8 i = 0; i < decimals.length; i++) {
            uint256 amount = 5 * 10 ** decimals[i];
            uint256 amountOther = 2 * 10 ** 9;
            TrimmedAmount memory trimmedAmount = amount.trim(decimals[i], 8);
            TrimmedAmount memory trimmedAmountOther = amountOther.trim(9, 8);
            TrimmedAmount memory trimmedSum = trimmedAmount.add(trimmedAmountOther);

            TrimmedAmount memory expectedTrimmedSum =
                TrimmedAmount(uint64(7 * 10 ** uint64(expectedDecimals[i])), expectedDecimals[i]);
            assert(expectedTrimmedSum.eq(trimmedSum));
        }
    }

    function testSubOperatorNonZero() public pure {
        uint8[2] memory decimals = [18, 3];
        uint8[2] memory expectedDecimals = [8, 3];

        for (uint8 i = 0; i < decimals.length; i++) {
            uint256 amount = 5 * 10 ** decimals[i];
            uint256 amountOther = 2 * 10 ** decimals[i];
            TrimmedAmount memory trimmedAmount = amount.trim(decimals[i], 8);
            TrimmedAmount memory trimmedAmountOther = amountOther.trim(decimals[i], 8);
            TrimmedAmount memory trimmedSub = trimmedAmount.sub(trimmedAmountOther);

            TrimmedAmount memory expectedTrimmedSub =
                TrimmedAmount(uint64(3 * 10 ** uint64(expectedDecimals[i])), expectedDecimals[i]);
            assert(expectedTrimmedSub.eq(trimmedSub));
        }
    }

    function testSubOperatorZero() public pure {
        uint8[2] memory decimals = [18, 3];
        uint8[2] memory expectedDecimals = [8, 3];

        for (uint8 i = 0; i < decimals.length; i++) {
            uint256 amount = 5 * 10 ** decimals[i];
            uint256 amountOther = 0;
            TrimmedAmount memory trimmedAmount = amount.trim(decimals[i], 8);
            TrimmedAmount memory trimmedAmountOther = amountOther.trim(decimals[i], 8);
            TrimmedAmount memory trimmedSub = trimmedAmount.sub(trimmedAmountOther);

            TrimmedAmount memory expectedTrimmedSub =
                TrimmedAmount(uint64(5 * 10 ** uint64(expectedDecimals[i])), expectedDecimals[i]);
            assert(expectedTrimmedSub.eq(trimmedSub));
        }
    }

    function testSubOperatorOverflow() public {
        uint8[2] memory decimals = [18, 3];

        for (uint8 i = 0; i < decimals.length; i++) {
            uint256 amount = 5 * 10 ** decimals[i];
            uint256 amountOther = 6 * 10 ** decimals[i];
            TrimmedAmount memory trimmedAmount = amount.trim(decimals[i], 8);
            TrimmedAmount memory trimmedAmountOther = amountOther.trim(decimals[i], 8);

            vm.expectRevert();
            trimmedAmount.sub(trimmedAmountOther);
        }
    }

    function testDifferentDecimals() public {
        uint8 sourceDecimals = 18;
        uint8 targetDecimals = 6;
        uint256 amount = 5 * 10 ** sourceDecimals;

        TrimmedAmount memory trimmedAmount = amount.trim(sourceDecimals, 8);
        // trimmed to 8
        uint256 amountRoundTrip = trimmedAmount.untrim(targetDecimals);
        // untrim to 6
        uint256 expectedRoundTrip = 5 * 10 ** targetDecimals;

        assertEq(expectedRoundTrip, amountRoundTrip);
    }

    // invariant: forall (x: uint256, y: uint8, z: uint8),
    //            (x <= type(uint64).max, y <= z)
    //                    => (x.trim(x, 8).untrim(y) == x)
    function testFuzz_trimIsLeftInverse(
        uint256 amount,
        uint8 fromDecimals,
        uint8 toDecimals
    ) public {
        // this is guaranteed by trimming
        uint256 amt = bound(amount, 1, type(uint64).max);
        vm.assume(fromDecimals <= 18);
        vm.assume(toDecimals <= 18);

        // trimming
        uint8 initialDecimals = 0;
        TrimmedAmount memory trimmedAmount = TrimmedAmount(uint64(amt), initialDecimals);

        // trimming is left inverse of trimming
        uint256 amountUntrimmed = trimmedAmount.untrim(fromDecimals);
        TrimmedAmount memory amountRoundTrip = amountUntrimmed.trim(fromDecimals, initialDecimals);

        assertEq(trimmedAmount.amount, amountRoundTrip.amount);
    }

    // FUZZ TESTS

    // invariant: forall (TrimmedAmount a, TrimmedAmount b)
    //            a.saturatingAdd(b).amount <= type(uint64).max
    function testFuzz_saturatingAddDoesNotOverflow(
        TrimmedAmount memory a,
        TrimmedAmount memory b
    ) public {
        vm.assume(a.decimals == b.decimals);

        TrimmedAmount memory c = a.saturatingAdd(b);

        // decimals should always be the same, else revert
        assertEq(c.decimals, a.decimals);

        // amount should never overflow
        assertLe(c.amount, type(uint64).max);
        // amount should never underflow
        assertGe(c.amount, 0);
    }

    // NOTE: above the TRIMMED_DECIMALS threshold will always get trimmed to TRIMMED_DECIMALS
    // or trimmed to the number of decimals on the recipient chain.
    // this tests for inputs with decimals > TRIMMED_DECIMALS
    function testFuzz_SubOperatorZeroAboveThreshold(uint256 amt, uint8 decimals) public pure {
        decimals = uint8(bound(decimals, 8, 18));
        uint256 maxAmt = (type(uint64).max) / (10 ** decimals);
        vm.assume(amt < maxAmt);

        uint256 amount = amt * (10 ** decimals);
        uint256 amountOther = 0;
        TrimmedAmount memory trimmedAmount = amount.trim(decimals, 8);
        TrimmedAmount memory trimmedAmountOther = amountOther.trim(decimals, 8);

        TrimmedAmount memory trimmedSub = trimmedAmount.sub(trimmedAmountOther);

        TrimmedAmount memory expectedTrimmedSub = TrimmedAmount(uint64(amt * (10 ** 8)), 8);
        assert(expectedTrimmedSub.eq(trimmedSub));
    }

    function testFuzz_SubOperatorWillOverflow(
        uint8 decimals,
        uint256 amtLeft,
        uint256 amtRight
    ) public {
        decimals = uint8(bound(decimals, 8, 18));
        uint256 maxAmt = (type(uint64).max) / (10 ** decimals);
        vm.assume(amtRight < maxAmt);
        vm.assume(amtLeft < amtRight);

        uint256 amountLeft = amtLeft * (10 ** decimals);
        uint256 amountRight = amtRight * (10 ** decimals);
        TrimmedAmount memory trimmedAmount = amountLeft.trim(decimals, 8);
        TrimmedAmount memory trimmedAmountOther = amountRight.trim(decimals, 8);

        vm.expectRevert();
        trimmedAmount.sub(trimmedAmountOther);
    }

    // NOTE: above the TRIMMED_DECIMALS threshold will always get trimmed to TRIMMED_DECIMALS
    // or trimmed to the number of decimals on the recipient chain.
    // this tests for inputs with decimals > TRIMMED_DECIMALS
    function testFuzz_AddOperatorZeroAboveThreshold(uint256 amt, uint8 decimals) public pure {
        decimals = uint8(bound(decimals, 8, 18));
        uint256 maxAmt = (type(uint64).max) / (10 ** decimals);
        vm.assume(amt < maxAmt);

        uint256 amount = amt * (10 ** decimals);
        uint256 amountOther = 0;
        TrimmedAmount memory trimmedAmount = amount.trim(decimals, 8);
        TrimmedAmount memory trimmedAmountOther = amountOther.trim(decimals, 8);

        TrimmedAmount memory trimmedSum = trimmedAmount.add(trimmedAmountOther);

        TrimmedAmount memory expectedTrimmedSum = TrimmedAmount(uint64(amt * (10 ** 8)), 8);
        assert(expectedTrimmedSum.eq(trimmedSum));
    }
}
