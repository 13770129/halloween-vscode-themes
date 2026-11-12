# Open this file and cycle the Unsloth Halloween themes to preview token colors.
"""Demonstration module covering many Python constructs for syntax highlighting.

Showcases strings, numbers, keywords, classes, decorators, async functions,
type hints, f-strings, regular expressions, comprehensions, match statements,
exceptions, lambdas, and hex literals. Switch between the Unsloth Halloween
themes (light and dark) to compare token colors.
"""

from __future__ import annotations

import asyncio
import json
import re
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Callable


class Mood(Enum):
    SPOOKY = "spooky"
    COZY = "cozy"
    GLOWING = "glowing"


@dataclass
class Haunt:
    name: str
    mood: Mood = Mood.SPOOKY
    candles: int = 1
    tags: list[str] = field(default_factory=list)

    @property
    def spook_level(self) -> float:
        return self.candles * 1.618


def decorate(fn: Callable[..., Any]) -> Callable[..., Any]:
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        print("calling decorated function")
        return fn(*args, **kwargs)

    return wrapper


@decorate
async def summon(glyph: str, times: int = 3) -> list[str]:
    chants: list[str] = []
    for i in range(times):
        chants.append(f"{glyph}-{i + 1}: {hex(0xDEADBEEF + i)}")
    return chants


REGEX = re.compile(r"\bpumpkin\b", re.IGNORECASE)


def classify(color: str) -> str:
    match color:
        case "#ff7a00":
            return "ember"
        case "#3a7d00" | "#8fe03a":
            return "whisper"
        case _:
            return "void"


SQUARES = [n * n for n in range(12) if n % 2 == 0]

to_json = lambda obj: json.dumps(obj, indent=2, sort_keys=True)


async def main() -> None:
    haunt = Haunt(name="The Thing", mood=Mood.GLOWING, candles=5, tags=["ice", "arctic"])
    try:
        chants = await summon("☾", times=2)
        print("\n".join(chants))
        print(haunt.spook_level)
        print(classify("#ff7a00"), classify("#00ff6a"))
        print(SQUARES, to_json({"haunt": haunt.name}))
        if not REGEX.search("A big pumpkin lit the lane."):
            raise RuntimeError("regex failed")
    except (ValueError, TypeError) as exc:
        print(f"recoverable: {exc}")
    except Exception:
        raise
    finally:
        print("done")


if __name__ == "__main__":
    asyncio.run(main())
