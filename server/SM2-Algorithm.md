
Content of: https://www.supermemo.com/english/ol/sm2.htm

==> The version of the algorithm used in this project starts at line 50

----------------------------------------------
This text was taken from P.A.Wozniak, Optimization of learning, Master's Thesis, University of Technology in Poznan, 1990 and adapted for publishing as an independent article on the web. (P.A.Wozniak, May 10, 1998)
I wrote the first SuperMemo program in December 1987 (Turbo Pascal 3.0, IBM PC). It was intended to enhance the SuperMemo method in two basic ways:

apply the optimization procedures to smallest possible items (in the paper-based SuperMemo items were grouped in pages),
differentiate between the items on the base of their different difficulty.
Having observed that subsequent inter-repetition intervals are increasing by an approximately constant factor (e.g. two in the case of the SM-0 algorithm for English vocabulary), I decided to apply the following formula to calculate inter-repetition intervals:

I(1):=1
I(2):=6
for n>2 I(n):=I(n-1)*EF

where:

I(n) - inter-repetition interval after the n-th repetition (in days)
EF - easiness factor reflecting the easiness of memorizing and retaining a given item in memory (later called the E-Factor).

E-Factors were allowed to vary between 1.1 for the most difficult items and 2.5 for the easiest ones. At the moment of introducing an item into a SuperMemo database, its E-Factor was assumed to equal 2.5. In the course of repetitions this value was gradually decreased in case of recall problems. Thus the greater problems an item caused in recall, the more significant was the decrease of its E-Factor.

Shortly after the first SuperMemo program had been implemented, I noticed that E-Factors should not fall below the value of 1.3. Items having E-Factors lower than 1.3 were repeated annoyingly often and always seemed to have inherent flaws in their formulation (usually they did not conform to the minimum information principle). Thus not letting E-Factors fall below 1.3 substantially improved the throughput of the process and provided an indicator of items that should be reformulated. The formula used in calculating new E-Factors for items was constructed heuristically and did not change much in the following 3.5 years of using the computer-based SuperMemo method.

In order to calculate the new value of an E-Factor, the student has to assess the quality of his response to the question asked during the repetition of an item (my SuperMemo programs use the 0-5 grade scale - the range determined by the ergonomics of using the numeric key-pad). The general form of the formula used was:

EF':=f(EF,q)

where:

EF' - new value of the E-Factor
EF - old value of the E-Factor
q - quality of the response
f - function used in calculating EF'.

The function f had initially multiplicative character and was in later versions of SuperMemo program, when the interpretation of E-Factors changed substantially, converted into an additive one without significant alteration of dependencies between EF', EF and q. To simplify further considerations only the function f in its latest shape is taken into account:

EF':=EF-0.8+0.28*q-0.02*q*q

which is a reduced form of:

EF':=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))

Note, that for q=4 the E-Factor does not change.

Let us now consider the final form of the SM-2 algorithm that with minor changes was used in the SuperMemo programs, versions 1.0-3.0 between December 13, 1987 and March 9, 1989 (the name SM-2 was chosen because of the fact that SuperMemo 2.0 was by far the most popular version implementing this algorithm).

---------------------------------------------------
==> Algorithm used:
Algorithm SM-2 used in the computer-based variant of the SuperMemo method and involving the calculation of easiness factors for particular items:

Split the knowledge into smallest possible items.
With all items associate an E-Factor equal to 2.5.
Repeat items using the following intervals:
I(1):=1
I(2):=6
for n>2: I(n):=I(n-1)*EF
where:
I(n) - inter-repetition interval after the n-th repetition (in days),
EF - E-Factor of a given item
If interval is a fraction, round it up to the nearest integer.
After each repetition assess the quality of repetition response in 0-5 grade scale:
5 - perfect response
4 - correct response after a hesitation
3 - correct response recalled with serious difficulty
2 - incorrect response; where the correct one seemed easy to recall
1 - incorrect response; the correct one remembered
0 - complete blackout.
After each repetition modify the E-Factor of the recently repeated item according to the formula:
EF':=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))
where:
EF' - new value of the E-Factor,
EF - old value of the E-Factor,
q - quality of the response in the 0-5 grade scale.
If EF is less than 1.3 then let EF be 1.3.
If the quality response was lower than 3 then start repetitions for the item from the beginning without changing the E-Factor (i.e. use intervals I(1), I(2) etc. as if the item was memorized anew).
After each repetition session of a given day repeat again all items that scored below four in the quality assessment. Continue the repetitions until all of these items score at least four.
The optimization procedure used in finding E-Factors proved to be very effective. In SuperMemo programs you will always find an option for displaying the distribution of E-Factors (later called the E-Distribution). The shape of the E-Distribution in a given database was roughly established within few months since the outset of repetitions. This means that E-Factors did not change significantly after that period and it is safe to presume that E-Factors correspond roughly to the real factor by which the inter-repetition intervals should increase in successive repetitions.

During the first year of using the SM-2 algorithm (learning English vocabulary), I memorized 10,255 items. The time required for creating the database and for repetitions amounted to 41 minutes per day. This corresponds to the acquisition rate of 270 items/year/min. The overall retention was 89.3%, but after excluding the recently memorized items (intervals below 3 weeks) which do not exhibit properly determined E-Factors the retention amounted to 92%. Comparing the SM-0 and SM-2 algorithms one must consider the fact that in the former case the retention was artificially high because of hints the student is given while repeating items of a given page. Items preceding the one in question can easily suggest the correct answer.
Therefore the SM-2 algorithm, though not stunning in terms of quantitative comparisons, marked the second major improvement of the SuperMemo method after the introduction of the concept of optimal intervals back in 1985. Separating items previously grouped in pages and introducing E-Factors were the two major components of the improved algorithm. Constructed by means of the trial-and-error approach, the SM-2 algorithm proved in practice the correctness of nearly all basic assumptions that led to its conception.

For a specific implementation of the Algorithm SM-2 see SuperMemo 2 Plug-In Source Code