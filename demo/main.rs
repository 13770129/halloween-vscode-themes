// Cycle the Unsloth Halloween themes on this file to preview token colors.
//! Theme preview: exercises many Rust token color roles.
//! Run: `rustc --edition 2021 demo/main.rs -o /tmp/rs-demo && /tmp/rs-demo`

#[derive(Debug, Clone, PartialEq)]
pub struct Candy {
    /// Flavor identifier.
    pub flavor: String,
    /// Pieces remaining.
    pub count: u32,
}
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Texture {
    Chewy,
    Crunchy,
    Smooth,
}
impl Candy {
    /// Fresh stash.
    pub fn new(flavor: &str, count: u32) -> Self {
        Self { flavor: flavor.into(), count }
    }

    /// Take one piece; error if empty.
    pub fn take(&mut self) -> Result<&str, String> {
        if self.count == 0 {
            return Err(format!("no {} left", self.flavor));
        }
        self.count -= 1;
        Ok(&self.flavor)
    }
}
/// Something that spooks.
pub trait Haunt {
    fn spook(&self) -> String;
}
impl Haunt for Candy {
    fn spook(&self) -> String {
        format!("Boo! {} x{}", self.flavor, self.count)
    }
}
// Generic box; type params + const fn.
pub struct Box<T> {
    inner: T,
}
impl<T> Box<T> {
    pub const fn new(inner: T) -> Self {
        Self { inner }
    }

    pub fn unwrap(self) -> T {
        self.inner
    }
}
const BASE_HP: i32 = 100;
static MAX_SPEED: f64 = 88.8;
fn hex_demo() -> u32 {
    0xDEAD_BEEF & 0x0000_FFFF
}
fn main() {
    let raw = r#"raw "quotes" and \backslash\`"#;
    let escaped = "escaped:\n\t\u{1F383}";
    let ch = '🎃';
    let byte: u8 = b'X';

    let mut candies = vec![
        Candy::new("corn", 3),
        Candy::new("broomstick", 7),
    ];

    // Closure over iterator.
    let names: Vec<String> = candies.iter().map(|c| c.flavor.clone()).collect();

    let haunted = Box::new(Candy::new("ghost", 1)).unwrap().spook();

    let score = match hex_demo() {
        0 => 0,
        n @ 1..=255 => n as i32 * 2,
        _ => -1,
    };

    for i in 0..3 {
        println!("{i}: {}", candies[i % 2].flavor);
    }

    while let Ok(flavor) = candies[0].take() {
        println!("took {flavor}");
    }

    let f: fn(u32) -> u32 = |x| x * 2;
    let _thunk = || score + f(BASE_HP as u32) as i32;

    let hk = || format!("{haunted} + {raw} + {escaped} + {ch} + {byte}");

    println!("{} | {names:?} | class=max {MAX_SPEED}", hk());
}
