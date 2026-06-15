# -*- coding: utf-8 -*-
# pip install deep-translator pandas openpyxl

import pandas as pd
from deep_translator import GoogleTranslator

# =========================
# FILE
# =========================
input_file = "jlpt.xlsx"
output_file = "jlpt_translated.xlsx"

# =========================
# ĐỌC EXCEL
# =========================
df = pd.read_excel(input_file)

# =========================
# DỊCH
# =========================
translations = []

for text in df["Japanese"]:

    if pd.isna(text):
        translations.append("")
        continue

    try:
        translated = GoogleTranslator(
            source='ja',
            target='vi'
        ).translate(str(text))

        print(text, "=>", translated)

        translations.append(translated)

    except Exception as e:

        print("Lỗi:", e)

        translations.append("")

# =========================
# THÊM CỘT
# =========================
df["Vietnamese"] = translations

# =========================
# LƯU FILE
# =========================
df.to_excel(output_file, index=False)

print(f"\nĐã lưu: {output_file}")

