// Cycle the Unsloth Halloween themes on this file to preview token colors.
// Package demo previews syntax token coloring across the Halloween themes.
//
// Run: go run demo/main.go
package main

import (
	"fmt"
	"strings"
)

// Candy is a sweet stash.
type Candy struct {
	Flavor string // inline comment
	Count  int    `json:"count"`
}

// NewCandy builds a stash.
func NewCandy(flavor string, count int) *Candy {
	return &Candy{Flavor: flavor, Count: count}
}

// Take removes one piece.
func (c *Candy) Take() (string, error) {
	if c.Count == 0 {
		return "", fmt.Errorf("no %s left", c.Flavor)
	}
	c.Count--
	return c.Flavor, nil
}

// Haunt is implemented by anything that can spook.
type Haunt interface {
	Spook() string
}

func (c *Candy) Spook() string {
	return fmt.Sprintf("Boo! %s x%d", c.Flavor, c.Count)
}

// Box is a generic container.
type Box[T any] struct {
	value T
}

// Unwrap yields the contained value.
func (b Box[T]) Unwrap() T {
	return b.value
}

const baseHP = 100
var maxSpeed = 88.8

func hexDemo() uint32 {
	return 0xDEAD_BEEF & 0x0000_FFFF
}

const (
	Chewy   = "chewy"
	Crunchy = "crunchy"
)

func main() {
	raw, escaped, runeLit, hex := `raw string with "quotes" and \backslash\`,
		"escaped:\n\t\U0001F383", '🎃', hexDemo()

	candies := []*Candy{
		NewCandy("corn", 3),
		NewCandy("broomstick", 7),
	}
	names := make([]string, 0, len(candies))
	for i, c := range candies {
		names = append(names, fmt.Sprintf("%d:%s", i, c.Flavor))
	}
	sw := ""
	switch {
	case hex < 0x100:
		sw = "low"
	case hex <= 0xFFF:
		sw = "mid"
	default:
		sw = "high"
	}
	message := make(chan string, 2)
	go func() {
		msg, err := candies[0].Take()
		if err != nil {
			message <- err.Error()
			return
		}
		message <- msg
	}()
	haunted := Box[string]{value: NewCandy("ghost", 1).Spook()}

	var s strings.Builder
	s.WriteString(haunted.Unwrap() + "\n")
	s.WriteString(fmt.Sprintf("%v %q %d %f %d\n", raw, escaped, runeLit, maxSpeed, baseHP))
	s.WriteString(strings.Join(names, ", ") + " " + sw + "\n")
	fmt.Printf("%s took %s\n", s.String(), <-message)
}
