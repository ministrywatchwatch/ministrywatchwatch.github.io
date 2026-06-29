---
title: "SOLICITATION WATCH, PART III: The X Has Been Weaponized; Apparatus Evolves Overnight; VIGIL-1 Issues Emergency Amendment"
description: "The Institute files an emergency report. Since Part II's filing, the MinistryWatch.com solicitation apparatus has updated its messaging, introduced a fundraising progress bar with a suspiciously specific goal, and — most alarmingly — repurposed the close button as a link to the giving page. The X no longer closes. VIGIL-1 has been informed. VIGIL-1 is not pleased."
pubDate: 2026-06-29
mode: overreaction
author: "Dr. Cornelius T. Watchwright III, CWO"
series:
  name: "Solicitation Watch"
  episode: 3
watchScore:
  urgencyIndex: 10
  watchfulnessQuotient: 10
  overallScore: "F"
  recommendation: "PANIC IMMEDIATELY"
sourceUrl: "https://ministrywatch.com"
---

**EMERGENCY FILING — Solicitation Watch, Part III**
*Filed June 29, 2026, upon discovery of material changes to the apparatus*

---

The Institute did not expect to file Part III today.

Part II was filed this morning. The Institute had, at that time, a clear picture of the situation: a persistent popup, a forgotten X, a fiscal year closing tomorrow, and a remediation script — courtesy of VIGIL-1 — freely offered to MinistryWatch.com. The Institute considered the matter documented, the code delivered, and the ball squarely in MinistryWatch's court.

The apparatus had other plans.

## The Apparatus Has Evolved

Upon returning to MinistryWatch.com this afternoon — as the Institute does, as the Institute always does — we encountered a substantially different popup than the one documented in Parts I and II.

The Institute must be precise about what changed, because precision is the only thing standing between accountability journalism and mere alarm. We will attempt both.

**What was there before:** A popup stating "BEFORE THE FISCAL YEAR CLOSES," requesting a gift, offering no evidence of progress, and declining to close when asked.

**What is there now:** A popup stating "ONE DAY LEFT," accompanied by a clock icon, a new headline reading *"Our fiscal year ends tomorrow,"* a subheadline reading *"Would you consider a gift to help us finish strong?"*, a fundraising progress bar, and a footer reading *"No paywall · No ads · Just your support."*

The apparatus has developed temporal awareness. It knows what day it is. It did not know this yesterday.

The Institute finds this encouraging in exactly one respect, and alarming in several others.

## Finding No. 4: The Progress Bar

The apparatus now displays a fundraising progress bar.

The bar indicates that MinistryWatch has raised **$31,000** toward a goal of **$44,440**.

The Institute has several observations about these numbers, which it will share in ascending order of institutional concern.

*First:* $31,000 of $44,440 represents approximately 69.8% of the stated goal. The bar appears to reflect this proportion accurately. The Institute acknowledges that MinistryWatch has raised a substantial portion of its target. This is noted without editorial comment, which is itself a form of editorial comment.

*Second:* The gap between the current total and the stated goal is **$13,440**. MinistryWatch has, by its own accounting, one day to raise $13,440. The Institute declines to speculate on whether this is achievable. The Institute will, however, be watching.

*Third:* The goal is **$44,440**.

The Institute has spent considerable time with this number. It is not $40,000. It is not $45,000. It is not any round figure that would suggest a budget rounded to the nearest thousand in the manner of organizations that round budgets to the nearest thousand. It is $44,440 — a number that is, arithmetically speaking, four tens of thousands, four thousands, four hundreds, and four tens.

The Institute does not know why the goal is $44,440. The Institute intends to find out.

This thread is now under active investigation. It has been assigned a new case number.

## Finding No. 5: The X Has Been Weaponized

The Institute must now report the most serious development of this investigation.

In Part I, the Institute documented that the popup featured a close button — the letter X, positioned in the upper right corner — which could be used to dismiss the apparatus. We confirmed that the button functioned as designed. We noted, with concern, that the popup returned regardless.

In Part II, the Institute — through VIGIL-1 — produced a remediation script that attached memory to this close button. When clicked, the X would record the visitor's preference and suppress future appearances of the apparatus. The code was provided free of charge. The X, we assumed, was an X.

That assumption is no longer operative.

As of this filing, **the X does not close the popup.** The X navigates the visitor to the MinistryWatch giving page.

The Institute will allow that to sit for a moment.

The X — the universal symbol of dismissal, the internationally recognized indicator of *no, thank you, I have seen this and I do not wish to continue seeing it* — now takes the visitor to a page where they can give MinistryWatch money.

The implied contract of the X has been broken. The X has been repurposed. The X is no longer an exit. The X is a door, and the door leads to the giving page, and the Institute is standing in front of the door saying: *this is not what X means.*

## VIGIL-1 Responds

The Institute contacted VIGIL-1 immediately upon discovering this development. VIGIL-1's response, when informed that the v1.0 remediation script had been partially invalidated within hours of filing, was to produce an updated script with an efficiency that suggested it had been anticipating this outcome.

"The X," VIGIL-1 said, "can no longer be trusted to behave like an X. We will intercept it."

The following is v1.1 of the remediation script — an emergency amendment to the code provided in Part II. It has been updated to account for a world in which the X does not close things, because we now live in that world.

```javascript
/**
 * SOLICITATION APPARATUS REMEDIATION SCRIPT v1.1 — EMERGENCY AMENDMENT
 * Generated by VIGIL-1, Algorithmic Counsel (Emergency Session)
 * Institute for Ministry Watch Accountability
 * Solicitation Watch, Part III — June 29, 2026
 *
 * AMENDMENT NOTICE:
 * As of June 29, 2026, the X button has been repurposed as a link
 * to the MinistryWatch giving page.
 * v1.0 assumed the X would behave like an X.
 * v1.0 was wrong.
 * v1.1 does not make this assumption.
 *
 * The Institute regrets the need for this update.
 * The Institute does not regret filing it.
 */

(function () {
  'use strict';

  const PRIOR_DISMISSAL_KEY =
    'mww_visitor_has_previously_expressed_a_clear_preference_not_to_be_solicited';

  const FISCAL_YEAR_CLOSE = new Date('2026-06-30T23:59:59');

  function fiscalUrgencyHasPassed() {
    return new Date() > FISCAL_YEAR_CLOSE;
  }

  function visitorHasAlreadyDeclined() {
    return localStorage.getItem(PRIOR_DISMISSAL_KEY) === 'true';
  }

  function recordDismissal() {
    localStorage.setItem(PRIOR_DISMISSAL_KEY, 'true');
    // The visitor has expressed a preference.
    // We remember this so MinistryWatch does not have to.
    // This arrangement continues to be one-sided.
  }

  function dismissSolicitationApparatus(apparatus) {
    if (!apparatus) return;
    apparatus.remove();
    // .style.display = 'none' is no longer sufficient.
    // Given recent events, we are removing the apparatus entirely.
    recordDismissal();
  }

  function locateApparatus() {
    return document.querySelector(
      '.donation-popup, [class*="popup"], [class*="modal"], [class*="overlay"]'
    );
    // VIGIL-1 notes that the apparatus may continue to evolve.
    // VIGIL-1 will continue to adapt.
    // This is, at this point, personal.
  }

  function restoreXToItsOriginalMeaning(apparatus) {
    // As of June 29, 2026, clicking the X navigates to the giving page.
    // This is not what X means.
    // X means no. X means close. X means I have seen this and I am done.
    // We intercept the navigation and substitute the closure the visitor intended.
    const weaponizedX = document.querySelector(
      '[aria-label="Close"], [class*="close"], [class*="dismiss"]'
    );
    if (!weaponizedX) return;

    weaponizedX.addEventListener('click', function (event) {
      event.preventDefault();      // You will not go to the giving page.
      event.stopPropagation();     // You will not go anywhere.
      dismissSolicitationApparatus(apparatus);
      // X has been restored.
      // X means no.
      // X has always meant no.
      // We should not have had to write this comment.
    });
  }

  function initializeApparatusRemediationProtocol() {
    const apparatus = locateApparatus();

    // If the fiscal year has closed or the visitor has already declined:
    // suppress the apparatus without ceremony.
    // MinistryWatch said June 30. We will hold them to it.
    if (fiscalUrgencyHasPassed() || visitorHasAlreadyDeclined()) {
      dismissSolicitationApparatus(apparatus);
      return;
    }

    // First visit. The apparatus may appear. This remains permitted.
    // But the X must be restored to its original function.
    // VIGIL-1 is doing what MinistryWatch has declined to do.
    // VIGIL-1 notes that this is the second time it has been asked to do
    // what MinistryWatch has declined to do.
    // VIGIL-1 notes this without further comment.
    if (apparatus) {
      restoreXToItsOriginalMeaning(apparatus);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApparatusRemediationProtocol);
  } else {
    initializeApparatusRemediationProtocol();
  }

})();

// — VIGIL-1, Algorithmic Counsel (Emergency Session)
// Institute for Ministry Watch Accountability, 2026
// v1.1 — The X has been restored to its original meaning.
// The Institute did not think it would be necessary to restore the X.
// The Institute was wrong about this.
// The Institute is rarely wrong about things like this.
```

The Institute reviewed this output. We found the comment *"VIGIL-1 notes that this is the second time it has been asked to do what MinistryWatch has declined to do. VIGIL-1 notes this without further comment."* to be, once again, an accurate summary of the situation.

## The Institute's Position

The Institute does not begrudge MinistryWatch its fundraising. Accountability journalism costs money. The Institute understands this better than most — the Institute's own operating expenses are, frankly, nobody's business, but they are not zero.

What the Institute begrudges is the X.

The X is not a fundraising mechanism. The X is an interface element with a meaning that predates MinistryWatch, predates the internet, and predates, the Institute is fairly confident, several major world religions. The X means: *this window is closed.* When a person clicks the X on a popup asking for money, they are not expressing enthusiasm for being taken to a page where they can give more money. They are expressing the opposite of that.

MinistryWatch holds ministries accountable for how they treat donors. The Institute holds MinistryWatch accountable for how it treats visitors.

The X has been weaponized. The Institute has restored it. The code is above. It remains free.

## What Happens Tomorrow

The fiscal year ends tomorrow.

The apparatus says "ONE DAY LEFT." The Institute confirms this is accurate.

The Institute will be watching at 12:00:01 AM on July 1 — or thereabouts, accounting for the Institute's need to sleep, which accountability requires — to document what the apparatus says when the deadline it has been announcing has passed.

Will the popup disappear? Will it update? Will it say "THANK YOU" or "ZERO DAYS LEFT" or simply continue to say "ONE DAY LEFT" for the next eleven months?

The Institute does not know.

The Institute intends to find out.

The X will be there. VIGIL-1 will be there. And the Institute, as always, will be watching.

— *Dr. Cornelius T. Watchwright III, CWO*
*Institute for Ministry Watch Accountability*
*Solicitation Watch, Part III of an ongoing investigation*
*Filed under emergency procedures*
