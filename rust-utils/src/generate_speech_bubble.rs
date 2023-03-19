use wasm_bindgen::prelude::*;
use textwrap::fill;
use unicode_width::UnicodeWidthStr;

#[wasm_bindgen]
pub fn speech_bubble(text: &str) -> String {
    const LINE_LIMIT: usize = 50;
    const SPEECH_LINE: &str = "\n   \\ \n    \\ \n     \\ \n";

    let wrapped_text = fill(text,LINE_LIMIT);
    let lines: Vec<&str> = wrapped_text.lines().collect();
    
    let num_lines = lines.len();
    let width_lines = widest_line(&lines);

    //Top Border
    let mut out = String::from(" ");
    out = out + &("_".repeat(width_lines + 2)) + " \n";

    //Text
    for (i, line) in lines.into_iter().enumerate() {
        let diff = width_lines - UnicodeWidthStr::width(line);
        if num_lines == 1 {
            out = out + "< " + line + " >\n";
        } else if i == 0 {
            out = out + "/ " + line + &(" ".repeat(diff)) + " \\\n";
        } else if i == num_lines - 1 {
            out = out + "\\ " + line + &(" ".repeat(diff)) + " /\n";
        } else {
            out = out + "| " + line + &(" ".repeat(diff)) + " |\n";
        }
    }
    out = out + " " + &("-".repeat(width_lines + 2));
    out = out + SPEECH_LINE;

    return out;
}

fn widest_line(lines: &[&str]) -> usize {
    let mut wideboy = UnicodeWidthStr::width(lines[0]);
    let mut width_lines;
    for line in lines {
        width_lines = UnicodeWidthStr::width(line.to_owned());
        if width_lines > wideboy {
            wideboy = width_lines;
        }
    }
    return wideboy;
}