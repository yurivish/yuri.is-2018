+++
date = "2016-08-03T15:51:31-04:00"
title = "On Formally Undecidable Propositions of Principia Mathematica and Related Systems"

+++

# Artisanal Belgian Chocolates

Programming languages are often evaluated on their efficiency and type safety, but what about friendliness? I explore how human values can be applied to programming language development, specifically looking at the twelve points of the Boy Scout Law: trustworthy, loyal, helpful, friendly, courteous, kind, obedient, cheerful, thrifty, brave, clean, and reverent.

Good things are _trustworthy_ and great. A trustworthy language is one you can believe will protect your secrets and not go behind your back to mess with your program semantics. Such a language should have ASLR enabled and should have crypto libraries made by experts so users don't roll their own. You should be able to trust that your language will make reasonable decisions on your behalf. For example, a language should not coerce your types in unreasonable ways when you're not looking—we ought not confused dynamic typing (checking types at runtime) with weak typing (coercing types instead of failing in the presence of type errors). Trust is an essential element of productivity. When a programmer does not trust his language, he is forced to program defensively and must battle both his own bugs as well as the compiler's. A trustworthy language permits the programmer to feel comfortable in his environment and to focus on the task at hand.

_Loyal._ A language is loyal when its design evolves with the preferences of its users, not its owners or corporate overlords. One should feel comfortable that a language will not turn around and get you sued for using its basic features.

_Helpful._ A language can be "helpful" in a myriad of ways, but one aspect often missing from newer languages is a means to help the programmer understand his errors. It should have a battle-tested debugger. You should not need an additional piece of software to decipher your compiler's dense and enigmatic build output. For brownie points, your compiler should explain why the programmer has encountered an error, and for the gold medal it should propose a solution.

_Friendly._ For a language, it makes the most sense to interpret this as "open to newcomers," e.g. Python is simple to start with whereas Standard ML can be a formidable foe when first learning functional languages. Having a REPL is a crucial part of a friendly language—it allows new programmers to play around with syntax and get a quick feel for a new language without having to wade through a hundred compiler errors or a monstrous IDE. As a corollary, dynamic languages often feel more friendly since they can be run in small pieces. They permit the programmer to make small errors which the user doesn't need to concern himself with until necessary.

_Courteous._ Any language should follow common courtesy: it should clean up after itself (compiler-managed memory) and talk respectfully to its elders (have FFI out to C).

_Kind._ For me, the distinguishing factor between kindness and other values like helpfulness and courtesy is intention. For a language to be kind, its designers need to be kind in turn. I have never met or heard of a language designer intentionally create a language harmful to its users or its community (although you have to watch people like Ken Thompson), but one should always be careful, particularly with closed-source languages. Language designers should have a clear, open dialogue with their community so as to not have their intentions misconstrued or turned against them.
