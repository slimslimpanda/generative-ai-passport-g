const flashcard = document.getElementById('flashcard');
const termEl = document.getElementById('term');
const definitionEl = document.getElementById('definition');
const linkEl = document.getElementById('link');
const chapterEl = document.getElementById('chapter'); // 章表示用の要素
const randomBtn = document.getElementById('random-btn');
const searchInput = document.getElementById('search-input');
const autocompleteList = document.getElementById('autocomplete-list');
const chapterSelect = document.getElementById('chapter-select'); // 章選択用の要素
const flashcardContainer = document.getElementById('flashcard-container');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

const words = [
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "AI(人工知能)",
    "definition": "明確な定義は存在しないが、「大量の知識データに対して、高度な推論を的確に行うことを目指したもの」とされている。",
    "link": "https://ja.wikipedia.org/wiki/%E4%BA%BA%E5%B7%A5%E7%9F%A5%E8%83%BD"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "ダートマス会議",
    "definition": "1956年の夏にアメリカのダートマス大学で開催された、人工知能という言葉が初めて使われ、AI研究が本格的に始まったとされる会議。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%80%E3%83%BC%E3%83%88%E3%83%9E%E3%82%B9%E4%BC%9A%E8%AD%B0"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "ルールベース",
    "definition": "あらかじめ設定されたルールに基づいて意思決定や処理を行うシステム。条件と行動のペアで構成される。",
    "link": "https://www.ai-souken.com/article/rule-based-ai-other"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "機械学習",
    "definition": "AIの一分野で、データからパターンを学習し、予測や意思決定を行う技術。明示的にプログラムされなくても、データに基づいて性能を向上させる。",
    "link": "https://ja.wikipedia.org/wiki/%E6%A9%9F%E6%A2%B0%E5%AD%A6%E7%BF%92"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "学習済みモデル",
    "definition": "機械学習アルゴリズムがデータから学習した結果として得られるモデル。このモデルは、新たなデータに対して予測や分類を行うために利用できる。",
    "link": "https://ledge.ai/ml-model-deployment/"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "教師あり学習",
    "definition": "正解ラベルが付与されたデータ（教師データ）を用いてモデルを学習させる機械学習の手法。分類や回帰問題に用いられる。",
    "link": "https://ja.wikipedia.org/wiki/%E6%95%99%E5%B8%AB%E3%81%82%E3%82%8A%E5%AD%A6%E7%BF%92"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "教師なし学習",
    "definition": "正解ラベルがないデータから、データ自身の構造やパターンを発見する機械学習の手法。クラスタリングや次元削減に用いられる。",
    "link": "https://ja.wikipedia.org/wiki/%E6%95%99%E5%B8%AB%E3%81%AA%E3%81%97%E5%AD%A6%E7%BF%92"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "クラスタリング",
    "definition": "教師なし学習の一種で、データの中から類似性の高いものを集めてグループ（クラスター）に分割する手法。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%A9%E3%82%B9%E3%82%BF%E3%83%AA%E3%83%B3%E3%82%B0"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "次元削減",
    "definition": "データの特徴量を減らすことで、データの構造を保持しつつ、データの複雑さを低減する手法。可視化や計算コスト削減に役立つ。",
    "link": "https://www.tech-teacher.jp/blog/dimension-reduction/"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "強化学習",
    "definition": "エージェントが環境と相互作用しながら、試行錯誤を通じて最適な行動戦略を学習する機械学習の手法。報酬を最大化するように学習を進める。",
    "link": "https://ja.wikipedia.org/wiki/%E5%BC%B7%E5%8C%96%E5%AD%A6%E7%BF%92"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "半教師あり学習",
    "definition": "教師あり学習と教師なし学習を組み合わせた手法。少量のラベル付きデータと大量のラベルなしデータを利用して学習を行う。",
    "link": "https://ja.wikipedia.org/wiki/%E5%8D%8A%E6%95%99%E5%B8%AB%E3%81%82%E3%82%8A%E5%AD%A6%E7%BF%92"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "ノーフリーランチ定理",
    "definition": "あらゆる問題に対して万能な機械学習アルゴリズムは存在しないという定理。特定の問題に最適なアルゴリズムは、他の問題では最適な性能を発揮しない可能性があることを示す。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%8E%E3%83%BC%E3%83%95%E3%83%AA%E3%83%BC%E3%83%A9%E3%83%B3%E3%83%81%E5%AE%9A%E7%90%86"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "ニューロン",
    "definition": "神経細胞のこと。人工ニューラルネットワークにおける処理単位のモデル。",
    "link": "https://www.sbbit.jp/article/cont1/33345"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "シナプス",
    "definition": "神経細胞間の接合部。人工ニューラルネットワークにおいて、ニューロン間の結合の強さ（重み）に相当する。",
    "link": "https://zenn.dev/nekoallergy/articles/ml-basic-nn01"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "人工ニューロン(ノード)",
    "definition": "人工ニューラルネットワークにおける情報の処理単位。複数の入力信号を受け取り、結合の重みを考慮して、活性化関数を通じて出力信号を生成する。",
    "link": "https://ja.wikipedia.org/wiki/%E4%BA%BA%E5%B7%A5%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%AD%E3%83%B3"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "ニューラルネットワーク",
    "definition": "人間の脳の神経回路を模倣した情報処理モデル。多数の人工ニューロンが層状に結合されており、学習によって複雑なパターンを認識できる。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%A9%E3%83%AB%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "ディープラーニング",
    "definition": "ニューラルネットワークの多層化により、より複雑な特徴表現を自動で学習する機械学習の一分野。深層学習とも呼ばれる。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%BC%E3%83%97%E3%83%A9%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "重み",
    "definition": "ニューラルネットワークにおいて、入力信号が次の層のニューロンに伝達される際の結合の強さを示す数値。学習によって調整される。",
    "link": "https://kuraberuai.fioriera.co.jp/ai-glossary/weight/"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "情報の重みづけ",
    "definition": "入力された情報に対して、その重要度に応じて異なる重み（係数）を乗じること。これにより、モデルは重要な情報に焦点を当てて学習できる。",
    "link": "https://kuraberuai.fioriera.co.jp/ai-glossary/weight/"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "過学習",
    "definition": "機械学習モデルが訓練データに過度に適合しすぎた結果、未知のデータに対しては性能が著しく低下してしまう現象。",
    "link": "https://ja.wikipedia.org/wiki/%E9%81%8E%E5%AD%A6%E7%BF%92"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "正則化",
    "definition": "過学習を防ぐために、モデルの複雑さを制限する手法。モデルの重みが大きくなりすぎることを抑制する役割がある。",
    "link": "https://ja.wikipedia.org/wiki/%E6%AD%A3%E5%89%87%E5%8C%96"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "ドロップアウト",
    "definition": "ニューラルネットワークの過学習を防ぐための正則化手法の一つ。学習時にランダムに一部のニューロンを無効化することで、モデルの汎化能力を高める。",
    "link": "https://zero2one.jp/ai-word/dropout/"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "転移学習",
    "definition": "あるタスクで学習済みのモデルを、別の関連するタスクに転用して学習させる手法。少ないデータで効率的に学習を進めることができる。",
    "link": "https://udemy.benesse.co.jp/data-science/deep-learning/transfer-learning.html"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "特徴量",
    "definition": "機械学習において、データが持つ特性や情報を数値で表現したもの。モデルの学習に用いられる入力データとなる。",
    "link": "https://jpn.nec.com/solution/dotdata/tips/feature/index.html"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "弱いAI (ANI)",
    "definition": "特定のタスクに特化して高い性能を発揮するAI。現在のAIのほとんどがこれに該当する。（例：画像認識、音声認識）",
    "link": "https://ja.wikipedia.org/wiki/%E5%BC%B1%E3%81%84AI"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "強いAI (AGI)",
    "definition": "人間のように多様なタスクをこなし、自律的に学習・思考・問題解決ができる汎用的なAI。まだ実現されていない概念。",
    "link": "https://ja.wikipedia.org/wiki/%E5%BC%B7%E3%81%84AI"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "第一次AIブーム",
    "definition": "1950年代後半から1960年代にかけてのAI研究の初期段階。探索や推論といった記号処理によるAIが中心であった。",
    "link": "https://www.soumu.go.jp/johotsusintokei/whitepaper/ja/h28/html/nc142120.html"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "探索",
    "definition": "AIが問題を解決するために、可能な選択肢の中から最適な経路や解を見つけ出すプロセス。",
    "link": "https://ja.wikipedia.org/wiki/%E6%8E%A2%E7%B4%A2%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "推論",
    "definition": "AIが与えられた情報や知識から、論理的な結論を導き出す能力。",
    "link": "https://ja.wikipedia.org/wiki/%E6%8E%A8%E8%AB%96"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "第二次AIブーム",
    "definition": "1980年代に起こったAI研究のブーム。エキスパートシステムが中心となり、特定の分野で専門家のような知識を用いた問題解決が可能になった。",
    "link": "https://www.soumu.go.jp/johotsusintokei/whitepaper/ja/h28/html/nc142120.html"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "エキスパートシステム",
    "definition": "人間の専門家の知識や推論過程をコンピュータシステムに実装したAI。特定の専門分野の問題解決に特化する。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%A8%E3%82%AD%E3%82%B9%E3%83%91%E3%83%BC%E3%83%88%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "AIの冬",
    "definition": "人工知能研究への資金提供と関心が低下した時期。",
    "link": "https://ja.wikipedia.org/wiki/AI%E3%81%AE%E5%86%AC"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "第三次AIブーム",
    "definition": "2000年代以降に起こったAI研究のブーム。ビッグデータ、計算能力の向上、ディープラーニングの発展により、AIが実用的な成果を上げ始めた。",
    "link": "https://www.soumu.go.jp/johotsusintokei/whitepaper/ja/h28/html/nc142120.html"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "ビッグデータ",
    "definition": "従来のデータ処理システムでは扱いきれないほど巨大で複雑なデータ群。AIの学習において重要な役割を果たす。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%93%E3%83%83%E3%82%B0%E3%83%87%E3%83%BC%E3%82%BF"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "シンギュラリティ (技術的特異点)",
    "definition": "人工知能が自己改良を繰り返し、人類の知能を超える時点。これにより、人間の予測を超える技術的、社会的な変化が起こるとされる。",
    "link": "https://ja.wikipedia.org/wiki/%E6%8A%80%E8%A1%93%E7%9A%84%E7%89%B9%E7%95%B0%E7%82%B9"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "ヴァーナー・ヴィンジ",
    "definition": "アメリカのSF作家。技術的特異点（シンギュラリティ）の概念を提唱した一人として知られる。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%B4%E3%82%A1%E3%83%BC%E3%83%8A%E3%83%BC%E3%83%BB%E3%83%B4%E3%82%A3%E3%83%B3%E3%82%B8"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "レイ・カーツワイル",
    "definition": "アメリカの発明家、未来学者。シンギュラリティが2045年頃に到来すると予測したことで知られる。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%AC%E3%82%A4%E3%83%BB%E3%82%AB%E3%83%BC%E3%83%84%E3%83%AF%E3%82%A4%E3%83%AB"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "2045年問題",
    "definition": "2045年にAIが人類の知能を超える技術的特異点（シンギュラリティ）を迎え、人間が予測不可能な問題が起こり、大きな影響を及ぼすとされている問題。",
    "link": "https://ja.wikipedia.org/wiki/2045%E5%B9%B4%E問題"
  },
  {
    "chapter": "第1章 AI(人工知能)",
    "term": "AI効果",
    "definition": "人工知能が何かを達成するたびに、人間がそれを「知能」ではなく単なる自動化や計算の高速化と見なしてしまう心理的傾向。",
    "link": "https://ja.wikipedia.org/wiki/AI%E5%8A%B9%E6%9E%9C"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "生成AI",
    "definition": "テキスト、画像、音声などの様々な形式のデータを、既存のデータから学習したパターンに基づいて新たに生成するAIの総称。",
    "link": "https://ja.wikipedia.org/wiki/%E7%94%9F%E6%88%90AI"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "ボルツマンマシン",
    "definition": "深層学習の初期に研究された確率的な生成モデルの一つ。隠れ層を持つニューラルネットワークで、学習によってデータ分布をモデル化する。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%9C%E3%83%AB%E3%83%84%E3%83%9E%E3%83%B3%E3%83%9E%E3%82%B7%E3%83%B3"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "制約付きボルツマンマシン",
    "definition": "ボルツマンマシンの変種で、隠れ層間の接続がないことで学習が容易になったモデル。レコメンデーションシステムなどで利用された。",
    "link": "https://ja.wikipedia.org/wiki/%E5%88%B6%E7%B4%84%E4%BB%B6%E3%81%8D%E3%83%9C%E3%83%AB%E3%83%84%E3%83%9E%E3%83%B3%E3%83%9E%E3%82%B7%E3%83%B3"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "自己回帰モデル",
    "definition": "時系列データやシーケンスデータにおいて、過去のデータ点や前の要素に基づいて次のデータ点や要素を予測・生成するモデル。",
    "link": "https://ja.wikipedia.org/wiki/%E8%87%AA%E5%B7%B1%E5%9B%9E%E5%B8%B0%E3%83%A2%E3%83%87%E3%83%AB"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "CNN (畳み込みニューラルネットワーク)",
    "definition": "画像データなどの空間的なパターン認識に特化したディープラーニングのネットワークアーキテクチャ。畳み込み層とプーリング層を特徴とする。",
    "link": "https://ja.wikipedia.org/wiki/%E7%95%B3%E3%81%BF%E8%BE%BC%E3%81%BF%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%A9%E3%83%AB%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "畳み込み",
    "definition": "CNNにおける主要な演算の一つ。フィルター（カーネル）を用いて入力データ（画像など）の特徴を抽出し、特徴マップを生成する操作。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%BF%E3%83%83%E3%83%88%E3%83%91%E3%83%83%E3%83%88%E5%85%A5%E5%8A%9B%E5%B1%A4"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "VAE (変分自己符号化器)",
    "definition": "データの生成と潜在表現の学習を同時に行う生成モデルの一つ。エンコーダでデータを潜在空間に圧縮し、デコーダでその潜在表現からデータを再構築する。",
    "link": "https://jitera.com/ja/insights/34682"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "ノイズ",
    "definition": "信号やデータに混入する不要な成分。VAEでは、潜在空間にノイズを加えることで、生成されるデータの多様性を高める。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%8E%E3%82%A4%E3%82%BA"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "エンコーダ",
    "definition": "VAEの一部で、入力データをより低次元の潜在空間表現に変換（符号化）する役割を持つニューラルネットワーク。",
    "link": "https://cvml-expertguide.net/terms/dl/encoder-decoder/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "デコーダ",
    "definition": "VAEの一部で、潜在空間表現から元のデータ形式に再構築（復号化）する役割を持つニューラルネットワーク。",
    "link": "https://cvml-expertguide.net/terms/dl/encoder-decoder/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "潜在ベクトル",
    "definition": "VAEにおいて、入力データの抽象的な特徴や意味を低次元の数値ベクトルとして表現したもの。このベクトルを操作することで新たなデータを生成できる。",
    "link": "https://ledge.ai/latent-space/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "GAN (敵対的生成ネットワーク)",
    "definition": "生成器（Generator）と識別器（Discriminator）という2つのネットワークが互いに競い合いながら学習することで、リアルなデータを生成するモデル。",
    "link": "https://ja.wikipedia.org/wiki/%E6%95%B5%E5%AF%BE%E7%9A%84%E7%94%9F%E6%88%90%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "生成器",
    "definition": "GANの一部で、ランダムなノイズを入力として受け取り、偽のデータ（画像、テキストなど）を生成するネットワーク。",
    "link": "https://ledge.ai/generative-adversarial-networks/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "識別器",
    "definition": "GANの一部で、与えられたデータが本物か偽物か（生成器が作ったものか）を識別するネットワーク。",
    "link": "https://ledge.ai/generative-adversarial-networks/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "RNN (回帰型ニューラルネットワーク)",
    "definition": "時系列データやシーケンスデータ（音声、テキストなど）の処理に適したニューラルネットワーク。過去の情報を記憶し、次の出力を予測する。",
    "link": "https://ja.wikipedia.org/wiki/%E5%9B%9E%E5%B8%B0%E5%9E%8B%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%A9%E3%83%AB%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "隠れ",
    "definition": "ニューラルネットワークの入力層と出力層の間に存在する層。ここで複雑な特徴抽出や変換が行われる。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%A9%E3%83%AB%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF#%E5%B1%A4"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "リカレント",
    "definition": "RNNの特性を指す言葉で、ネットワーク内部に自己ループを持ち、過去の情報を再帰的に利用することを意味する。",
    "link": "https://ja.wikipedia.org/wiki/%E5%9B%9E%E5%B8%B0%E5%9E%8B%E3%83%8B%E3%83%A5%E3%83%BC%E3%83%A9%E3%83%AB%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "シーケンスデータ",
    "definition": "要素が順序を持つデータ。時系列データやテキストデータなどが該当する。",
    "link": "https://e-words.jp/w/%E3%82%B7%E3%83%BC%E3%82%B1%E3%83%B3%E3%82%B9%E3%83%87%E3%83%BC%E3%82%BF.html"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "LSTM (長・短期記憶)",
    "definition": "RNNの一種で、長期的な依存関係を学習できる能力を持つ。従来のRNNが抱える勾配消失問題を解決するために開発された。",
    "link": "https://ja.wikipedia.org/wiki/%E9%95%B7%E3%83%BB%E7%9F%AD%E6%9C%9F%E8%A8%98%E6%86%B6"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "Transformerモデル",
    "definition": "Attentionメカニズムのみで学習を行うニューラルネットワークのアーキテクチャ。RNNの欠点を克服し、自然言語処理分野で高い性能を発揮している。",
    "link": "https://ja.wikipedia.org/wiki/Transformer"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "Attention",
    "definition": "Transformerモデルにおいて、入力シーケンスの異なる部分の重要度を動的に計算し、その情報に「注意」を向けるメカニズム。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%86%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%BB%E3%83%A1%E3%82%AB%E3%83%8B%E3%82%Bズム"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "自己注意力(Self-Attention)",
    "definition": "Attentionメカニズムの一種で、入力シーケンス内の異なる位置にある要素同士の関連性を計算し、各要素の表現を豊かにする仕組み。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%86%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%BB%E3%83%A1%E3%82%AB%E3%83%8B%E3%82%Bズム#Self-Attention"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "Attention Mechanism",
    "definition": "人工ニューラルネットワークにおいて、入力データのある部分を強化し、他の部分を弱化する効果を持つ手法。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%86%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%BB%E3%83%A1%E3%82%AB%E3%83%8B%E3%82%Bズム"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "位置エンコーディング",
    "definition": "Transformerモデルにおいて、単語の順序や位置情報をモデルに伝えるための仕組み。Attentionメカニズムが位置情報を考慮しないため必要となる。",
    "link": "https://towardsdatascience.com/positional-encoding-in-transformer-models-8a1835560a6e"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "アーキテクチャ",
    "definition": "AIモデルやシステムの全体的な設計や構造。データの流れ、各コンポーネントの役割、それらの相互作用などを指す。",
    "link": "https://e-words.jp/w/%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%81%E3%83%A3.html"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "GPTモデル",
    "definition": "OpenAIが開発したTransformerベースの事前学習済み言語モデルのシリーズ。大量のテキストデータで学習されており、高い文章生成能力を持つ。",
    "link": "https://ja.wikipedia.org/wiki/GPT"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "Open AI",
    "definition": "人工知能の研究と開発を行うアメリカの非営利団体および企業。ChatGPTなどを開発し、AI技術の普及に貢献している。",
    "link": "https://ja.wikipedia.org/wiki/OpenAI"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "BERTモデル",
    "definition": "Googleが開発した自然言語処理モデルで、TransformerのEncoder部分を双方向で利用する。文脈を理解し、様々なNLPタスクで高い精度を発揮する。",
    "link": "https://ja.wikipedia.org/wiki/BERT_(%E8%A8%80%E8%AA%9E%E3%83%A2%E3%83%87%E3%83%AB)"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "MLM (Masked Language Model)",
    "definition": "BERTなどの事前学習タスクの一つ。文章中の単語の一部をマスクし、周囲の文脈からマスクされた単語を予測するようにモデルを学習させる。",
    "link": "https://towardsdatascience.com/masked-language-model-mlm-and-next-sentence-prediction-nsp-explained-bf7c1266205"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "NSP (Next Sentence Prediction)",
    "definition": "BERTなどの事前学習タスクの一つ。2つの文が連続しているかを予測させることで、文間の関係性を理解するようにモデルを学習させる。",
    "link": "https://towardsdatascience.com/masked-language-model-mlm-and-next-sentence-prediction-nsp-explained-bf7c1266205"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "ROBERTa",
    "definition": "BERTを改良した言語モデル。より多くのデータと長い学習時間、最適化された事前学習タスクを使用することで、BERTよりも性能が向上している。",
    "link": "https://ja.wikipedia.org/wiki/RoBERTa"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "ALBERT (a Lite BERT)",
    "definition": "BERTを軽量化したモデル。パラメータ共有や埋め込み因数分解などの手法を用いることで、モデルサイズを小さくしながらも高い性能を維持する。",
    "link": "https://arxiv.org/abs/1909.11942"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "ChatGPT",
    "definition": "米OpenAI社によって開発された、人間との対話に近い自然な文章を生成するAIチャットサービス。",
    "link": "https://ja.wikipedia.org/wiki/ChatGPT"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "GPT-1",
    "definition": "OpenAIが開発した最初のGenerative Pre-trained Transformerモデル。大規模なテキストデータで事前学習され、ファインチューニングによって様々な自然言語処理タスクに適用可能だった。",
    "link": "https://openai.com/research/language-models-are-unsupervised-multitask-learners"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "自然言語処理(NLP)",
    "definition": "人間の自然言語（日本語、英語など）をコンピュータに理解させ、処理させる技術分野。機械翻訳、文章要約、感情分析などが含まれる。",
    "link": "https://ja.wikipedia.org/wiki/%E8%87%AA%E7%84%B6%E8%A8%80%E8%AA%9E%E5%87%A6%E7%90%86"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "GPT-2",
    "definition": "GPT-1の後継モデルで、さらに大規模なデータで学習され、より高品質な文章生成が可能になった。倫理的な懸念から当初は完全版が公開されなかった。",
    "link": "https://openai.com/research/better-language-models"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "パラメータ",
    "definition": "機械学習モデルが学習中に調整する内部変数。ニューラルネットワークにおける重みやバイアスなどがこれに該当する。",
    "link": "https://e-words.jp/w/%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF.html"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "InstructGPT",
    "definition": "人間のフィードバックからの強化学習（RLHF）を用いて、GPT-3を指示に従いやすく、ハルシネーションを減らすようにファインチューニングされたモデル。",
    "link": "https://openai.com/research/instructgpt"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "GPT-3.5",
    "definition": "InstructGPTをベースにしたモデルで、ChatGPTの初期バージョンにも利用された。より自然で対話的な応答が可能になった。",
    "link": "https://openai.com/blog/chatgpt"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "GPT-4",
    "definition": "OpenAIによって開発されたGPTシリーズの最新モデルの一つ。マルチモーダルに対応し、テキストだけでなく画像入力も処理できるなど、大幅に性能が向上した。",
    "link": "https://openai.com/research/gpt-4"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "データセット",
    "definition": "機械学習モデルの訓練、検証、テストに用いられるデータの集合。大量かつ多様なデータがモデルの性能向上に不可欠。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%87%E3%83%BC%E3%82%BF%E3%82%BB%E3%83%83%E3%83%88"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "RLHF (Reinforcement Learning from Human Feedback)",
    "definition": "人間のフィードバック（評価）を報酬として用い、強化学習によってAIモデルを調整する手法。AIが人間の意図に沿った出力を生成できるようになる。",
    "link": "https://ja.wikipedia.org/wiki/%E4%BA%BA%E9%96%93%E3%81%AE%E3%83%95%E3%82%A3%E3%83%BC%E3%83%89%E3%83%90%E3%83%83%E3%82%AF%E3%81%8B%E3%82%89%E3%81%AE%E5%BC%B7%E5%8C%96%E5%AD%A6%E7%BF%92"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "アライメント (Alignment)",
    "definition": "AIシステムが人間の価値観や意図、目標と一致するように設計・開発されること。AIが望ましくない行動をとるリスクを低減する目的がある。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%A9%E3%82%A4%E3%83%A1%E3%83%B3%E3%83%88_(%E4%BA%BA%E5%B7%A5%E7%9F%A5%E8%83%BD)"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "ファインチューニング",
    "definition": "事前学習済みのモデルを、特定のタスクやデータセットに合わせてさらに学習させること。既存の知識を活用し、効率的にモデルを最適化できる。",
    "link": "https://ledge.ai/fine-tuning/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "ハルシネーション (Hallucination)",
    "definition": "生成AIが事実に基づかない、または論理的に誤った情報を、もっともらしく生成してしまう現象。幻覚と訳されることもある。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%AB%E3%82%B7%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3_(%E4%BA%BA%E5%B7%A5%E7%9F%A5%E8%83%BD)"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "マルチモーダル",
    "definition": "複数の異なる種類のデータ（テキスト、画像、音声など）を同時に処理・理解・生成できるAIの能力。例：画像とテキストを組み合わせて理解するAI。",
    "link": "https://ledge.ai/multi-modal-ai/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "Code Interpreter",
    "definition": "ChatGPT内でPythonのコードを実行できる機能。プログラミングの知識がなくとも会話による指示のみで、プログラムに変換しフィードバックしてくれる。",
    "link": "https://openai.com/blog/chatgpt-plugins"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "GPTS",
    "definition": "ChatGPTを個々のニーズに合わせてカスタマイズできる機能。特定の目的やタスクに特化したChatGPTのバージョンを作成できる。",
    "link": "https://openai.com/blog/introducing-gpts"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "GPT-4o",
    "definition": "OpenAIが開発した最新のマルチモーダルモデル。「omni」（すべての）を意味し、テキスト、音声、画像を統合的に処理する能力を持つ。",
    "link": "https://openai.com/gpt-4o/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "テキスト生成AI",
    "definition": "自然言語処理技術を用いて、人間が書いたような自然な文章を自動的に生成するAI。要約、翻訳、記事作成などに利用される。",
    "link": "https://ledge.ai/text-generation-ai/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "画像生成AI",
    "definition": "テキスト記述やその他の入力に基づいて、リアルな画像やイラストを生成するAI。GANや拡散モデルなどが主要な技術。",
    "link": "https://ledge.ai/image-generation-ai/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "音楽生成AI",
    "definition": "ジャンルや気分、楽器構成などの指定に基づいて、オリジナルの音楽を生成するAI。作曲支援やBGM作成に利用される。",
    "link": "https://ledge.ai/ai-music-generation/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "音声生成AI",
    "definition": "テキストから自然な音声を生成するAI（テキスト音声合成）や、既存の音声から新しい音声を生成するAI。ナレーションやバーチャルアシスタントに利用される。",
    "link": "https://ledge.ai/voice-synthesis-ai/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "画像のリサイズ",
    "definition": "画像の縦横のピクセル数を変更して、画像の大きさを調整する処理。",
    "link": "https://ja.wikipedia.org/wiki/%E7%94%BB%E5%83%8F%E3%81%AE%E3%83%AA%E3%82%B5%E3%82%A4%E3%82%BA"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "正規化",
    "definition": "画像処理において、ピクセル値の範囲を特定の区間（例：0-1）に変換する処理。モデルの学習効率を高める。",
    "link": "https://ja.wikipedia.org/wiki/%E6%AD%A3%E8%A6%8F%E5%8C%96_(%E6%95%B0%E5%AD%A6)"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "データの水増し (augmentation)",
    "definition": "機械学習において、既存のデータに変換（回転、拡大縮小、反転など）を施すことで、学習データの量を擬似的に増やし、モデルの汎化能力を高める手法。",
    "link": "https://ledge.ai/data-augmentation/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "データ拡張技術",
    "definition": "データの水増しと同義。限られたデータからモデルの性能を向上させるために、既存データに多様な変換を加えてデータ量を増やす技術。",
    "link": "https://ledge.ai/data-augmentation/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "リマスタリング",
    "definition": "既存の音源や映像の品質を向上させるための再編集作業。AIがこれを自動で行う技術も開発されている。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%AA%E3%83%B3%E3%82%B0"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "Claude",
    "definition": "Anthropic社が開発したチャット型生成AIツール。自然な会話能力や大量の文字数を処理する能力に優れる。",
    "link": "https://www.anthropic.com/index/claude"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "Gemini",
    "definition": "Googleによって開発されたマルチモーダルAIモデル。テキスト、画像、音声、動画など多様な情報を理解し、生成できる。",
    "link": "https://gemini.google.com/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "Sora",
    "definition": "OpenAIが開発中のテキストから動画を生成するAIモデル。高品質で写実的な動画を生成する能力を持つ。",
    "link": "https://openai.com/sora"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "Runway Gen-3",
    "definition": "Runway AIが開発するテキストから動画を生成するAIモデルのシリーズ。クリエイティブな動画制作ツールとして注目されている。",
    "link": "https://runwayml.com/blog/gen3alpha/"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "Luma Dream Machine",
    "definition": "Luma AIが開発した動画生成AIモデル。テキストや画像から高品質な3Dシーンや動画を生成できる。",
    "link": "https://lumalabs.ai/dream-machine"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "ディープフェイク (深層偽造)技術",
    "definition": "AI、特にディープラーニングを用いて、人物の顔や音声を合成し、あたかもその人物が実際に存在しない言動をしたかのように見せかける技術。偽情報の拡散に悪用されるリスクがある。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%BC%E3%83%97%E3%83%95%E3%82%A7%E3%82%A4%E3%82%AF"
  },
  {
    "chapter": "第2章 生成AI",
    "term": "偽情報(ディスインフォメーション)",
    "definition": "意図的に誤解させる目的で作成・拡散される虚偽または不正確な情報。ディープフェイク技術によってその拡散が加速される懸念がある。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%82%B9%E3%82%A4%E3%83%B3%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "テキスト生成AI",
    "definition": "テキスト生成AIとは、ユーザーからの指示や質問に対して、AIが自動で文章を生成する技術やサービスのこと。大量のテキストデータを学習し、人間らしい自然な文章や要約、翻訳、校正などを行うことができる。",
    "link": "https://www.itreview.jp/categories/text-generative-ai"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "画像のリサイズ",
    "definition": "画像のリサイズとは、画像の縦横サイズ（ピクセル数）を変更する処理。主に画像の保存やWeb掲載、AI学習用データの標準化などに使われる。縦横比を維持したまま縮小・拡大することも可能。",
    "link": "https://saruwakakun.com/tools/image-resize/"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "正規化",
    "definition": "正規化とは、データを一定の規則や基準に従って変換し、利用しやすい形に整えること。AI分野では、画像や数値データを0〜1の範囲に揃えるなど、学習効率や精度向上のために使われる。",
    "link": "https://ja.wikipedia.org/wiki/%E6%AD%A3%E8%A6%8F%E5%8C%96"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "データの水増し（augmentation）",
    "definition": "データの水増し（データ拡張、augmentation）とは、元データに変換や加工を加えて新しいバリエーションを作り、AIモデルの学習データ量を人工的に増やす技術。画像の回転や反転、ノイズ付加などが代表的。",
    "link": "https://nulmil.net/data-augmentation/"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "データ拡張技術",
    "definition": "データ拡張技術とは、既存データに様々な変換（画像の回転、反転、明るさ調整など）を加えることで、学習に使うデータの量と多様性を人工的に増やす手法。AIモデルの汎化性能向上に役立つ。",
    "link": "https://ai-compass.weeybrid.co.jp/learning/boosting-learning-with-data-augmentation/"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "リマスタリング",
    "definition": "リマスタリングとは、元のデータ（画像、音声、映像など）を最新の技術や基準で再処理し、品質を向上させること。AI分野では、古い画像や音声を高解像度化・ノイズ除去するなどの用途で使われる。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%AA%E3%83%B3%E3%82%B0"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "ユーザーエクスペリエンス",
    "definition": "ユーザーエクスペリエンス（UX）とは、ユーザーが製品やサービスを利用する際に得る体験や満足度のこと。AIサービスでは、操作のしやすさや応答の自然さ、品質の高さなどがUX向上のカギとなる。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%A8%E3%82%AF%E3%82%B9%E3%83%9A%E3%83%AA%E3%82%A8%E3%83%B3%E3%82%B9"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "ディープフェイク（深層偽造）技術",
    "definition": "ディープフェイクとは、AI技術（主にディープラーニング）を用いて、人物の顔や声などを本物そっくりに合成・置換する技術。偽情報の拡散やプライバシー侵害などのリスクも指摘されている。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%BC%E3%83%97%E3%83%95%E3%82%A7%E3%82%A4%E3%82%AF"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "偽情報（ディスインフォメーション）",
    "definition": "偽情報（ディスインフォメーション）とは、意図的に作られた虚偽の情報や誤解を招く情報のこと。ディープフェイク技術などによって拡散されることが増えており、社会的な問題となっている。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%82%B9%E3%82%A4%E3%83%B3%E3%83%95%E3%82%A9%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "大規模言語モデル（LLM）",
    "definition": "大規模言語モデル（LLM）は、膨大なテキストデータを学習して自然言語を理解・生成するAIモデル。ChatGPTやBERTなどが代表例で、さまざまなタスクに応用されている。",
    "link": "https://www.sbbit.jp/article/cont1/115335"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "ファインチューニング",
    "definition": "ファインチューニングは、既存のAIモデルを特定の用途やデータに合わせて追加学習させることで、精度や応用性を高める手法。",
    "link": "https://www.keyence.co.jp/ss/general/ai/column/ai-003.html"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "プロンプトエンジニアリング",
    "definition": "プロンプトエンジニアリングは、生成AIに最適な出力を得るために、入力文（プロンプト）を工夫・設計する技術やノウハウのこと。",
    "link": "https://www.sbbit.jp/article/cont1/116689"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "マルチモーダルAI",
    "definition": "マルチモーダルAIは、テキスト・画像・音声など複数の異なる種類のデータを統合的に処理・理解できるAI技術。",
    "link": "https://www.sbbit.jp/article/cont1/117033"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "トランスフォーマー",
    "definition": "トランスフォーマーは、自然言語処理や画像処理などで使われるAIモデルの一種で、自己注意機構（Self-Attention）を用いて高精度な処理を実現する。",
    "link": "https://www.sbbit.jp/article/cont1/117033"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "バイアス",
    "definition": "バイアスは、AIが学習データに含まれる偏りをそのまま反映し、不公平な判断や出力を行う現象。AI倫理や社会的課題として注目されている。",
    "link": "https://www.meti.go.jp/policy/mono_info_service/joho/genai/ai-bias.html"
  },
  {
    "chapter": "第3章 現在の生成AIの動向",
    "term": "著作権",
    "definition": "著作権は、創作物の作者が持つ知的財産権であり、生成AIが作成したコンテンツの権利や利用範囲が近年議論されている。",
    "link": "https://www.bunka.go.jp/seisaku/chosakuken/seidokaisetsu/genai/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "インターネットリテラシー",
    "definition": "インターネットを安全かつ効果的に利用するための知識、スキル、判断能力。情報の真偽を見極める能力などが含まれる。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%8D%E3%83%83%E3%83%88%E3%83%BB%E3%83%AA%E3%83%86%E3%83%A9%E3%82%B7%E3%83%BC"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "テクノロジーの理解",
    "definition": "情報技術やAI技術の仕組み、特性、影響について基本的な知識を持つこと。これにより、適切に技術を利活用できる。",
    "link": "https://e-words.jp/w/%E6%83%85%E5%A0%B1%E3%83%AA%E3%83%86%E3%83%A9%E3%82%B7%E3%83%BC.html"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "情報リテラシー",
    "definition": "情報を効果的に検索、評価、利用、共有する能力。特に、情報の信頼性や偏りを見抜く批判的思考力を含む。",
    "link": "https://ja.wikipedia.org/wiki/%E6%83%85%E5%A0%B1%E3%83%AA%E3%83%86%E3%83%A9%E3%82%B7%E3%83%BC"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "セキュリティとプライバシー",
    "definition": "情報システムやデータが不正アクセス、改ざん、漏洩から保護されている状態（セキュリティ）と、個人情報が適切に管理され、個人の権利が尊重される状態（プライバシー）の確保。",
    "link": "https://www.soumu.go.jp/main_sosiki/cybersecurity/security_privacy.html"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "デジタル市民権",
    "definition": "デジタル社会において、個人が持つべき権利と責任。インターネットへのアクセス権、表現の自由、プライバシー保護、デジタル上の安全などが含まれる。",
    "link": "https://www.toolify.ai/ja/ai-news-jp/%E5%B8%82%E6%B0%91%E6%A8%A9%E9%87%8D%E8%A6%81%E6%80%A7%E5%B0%86%E6%9D%A5%E8%80%83%E5%AF%9F-1911278"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "フィッシング詐欺",
    "definition": "金融機関や有名企業などを装い、偽のウェブサイトやメールに誘導して、個人情報や金銭をだまし取る詐欺行為。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0_(%E8%A8%90%E6%AC%BA)"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "スミッシング",
    "definition": "SMS（ショートメッセージサービス）を利用したフィッシング詐欺。偽のメッセージで悪意のあるリンクをクリックさせようとする。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%B9%E3%83%9F%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "ヴィッシング(ボイスフィッシング詐欺)",
    "definition": "音声通話（Voice）を利用したフィッシング詐欺。電話で個人情報を聞き出そうとする。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%B4%E3%82%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "マルウェア",
    "definition": "悪意のあるソフトウェアの総称。ウイルス、ワーム、トロイの木馬、ランサムウェアなどが含まれ、コンピュータシステムに損害を与えたり、情報を盗んだりする。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%9E%E3%83%AB%E3%82%A6%E3%82%A7%E3%82%A2"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "アンチウイルスソフトウェア",
    "definition": "コンピュータウイルスやその他のマルウェアの検出、除去、予防を行うソフトウェア。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%B3%E3%83%81%E3%82%A6%E3%82%A4%E3%83%AB%E3%82%B9%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "ランサムウェア",
    "definition": "マルウェアの一種で、コンピュータのデータやシステムを暗号化し、復旧と引き換えに身代金（Ransom）を要求するもの。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%A9%E3%83%B3%E3%82%B5%E3%83%A0%E3%82%A6%E3%82%A7%E3%82%A2"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "ソーシャルエンジニアリング攻撃",
    "definition": "技術的な手法ではなく、人間の心理的な隙や行動のミスを突いて、情報を盗み出したり、不正な操作を行わせたりする攻撃手法。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%BD%E3%83%BC%E3%82%B7%E3%83%A3%E3%83%AB%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%83%AA%E3%83%B3%E3%82%B0"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "スピアフィッシング",
    "definition": "特定の個人や組織を標的とした、巧妙なフィッシング詐欺。標的の情報を事前に収集し、信頼させるような内容で攻撃を行う。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%B9%E3%83%94%E3%82%A2%E3%83%95%E3%82%A3%E3%83%83%E3%82%B7%E3%83%B3%E3%82%B0"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "ベイト攻撃",
    "definition": "攻撃者がUSBメモリなどの物理メディアを意図的に置き去りにし、それを拾った人が中身を確認しようとすることでマルウェアに感染させる手法。",
    "link": "https://e-words.jp/w/%E3%83%99%E3%82%A4%E3%83%88%E6%94%BB%E6%92%83.html"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "ブラックメール",
    "definition": "脅迫メールの一種で、攻撃者が被害者の秘密や弱みを握っていると主張し、金銭などを要求するもの。性的な内容で脅迫するケースも多い。",
    "link": "https://e-words.jp/w/%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF%E3%83%A1%E3%83%BC%E3%83%AB.html"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "プレテキスト",
    "definition": "ソーシャルエンジニアリング攻撃の一種。攻撃者が信頼できる人物や機関を装って、虚偽の口実（プレテキスト）を作り、被害者から情報を引き出す手法。",
    "link": "https://e-words.jp/w/%E3%83%97%E3%83%AC%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88.html"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "個人情報保護法",
    "definition": "個人情報の適正な取扱いを定めた日本の法律。個人の権利利益を保護しつつ、個人情報の有用性に配慮することを目的とする。",
    "link": "https://www.ppc.go.jp/personalinfo/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "改正個人情報保護法",
    "definition": "デジタル社会の進展に対応するため、個人情報保護法が改正されたもの。個人情報の利活用促進と保護のバランスを図る。",
    "link": "https://www.ppc.go.jp/personalinfo/revised_act/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "個人情報保護委員会",
    "definition": "個人情報保護法に基づいて設置された独立行政委員会。個人情報の保護に関する監視、監督、啓発活動を行う。",
    "link": "https://www.ppc.go.jp/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "個人情報取扱事業者",
    "definition": "個人情報データベース等を事業の用に供している者。個人情報保護法に基づき、個人情報の適正な取扱いが義務付けられる。",
    "link": "https://www.ppc.go.jp/files/pdf/sekinin_01.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "個人識別符号",
    "definition": "特定の個人を識別できる情報。指紋、顔のデータ、DNA、パスポート番号などが該当する。",
    "link": "https://www.ppc.go.jp/faq/personal_id_code/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "要配慮個人情報",
    "definition": "人種、信条、病歴、犯罪の経歴など、不当な差別や偏見が生じる可能性のある個人情報。取得や利用に厳格な制限がある。",
    "link": "https://www.ppc.go.jp/faq/required_care_personal_information/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "機微(センシティブ)情報",
    "definition": "要配慮個人情報と同様に、特に慎重な取扱いが必要とされる個人情報。医療情報、金融情報などが含まれる場合がある。",
    "link": "https://www.soumu.go.jp/main_content/000282110.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "匿名加工情報",
    "definition": "個人情報を特定の個人を識別できないように加工し、かつ復元できないようにした情報。個人情報保護法の規制が緩和される。",
    "link": "https://www.ppc.go.jp/personalinfo/anonymous/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "マスキング",
    "definition": "個人情報の一部を隠したり、別の情報に置き換えたりすることで、個人を特定できないようにする技術。匿名加工の手段の一つ。",
    "link": "https://e-words.jp/w/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%9E%E3%82%B9%E3%82%AD%E3%83%B3%E3%82%B0.html"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "知的財産権",
    "definition": "人間の知的活動によって創作されたものに対し、創作者に与えられる排他的な権利の総称。著作権、特許権、商標権などが含まれる。",
    "link": "https://www.jpo.go.jp/system/laws/rule/chizai/index.html"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "著作権",
    "definition": "文芸、学術、美術、音楽などの創作物（著作物）を保護する権利。著作者の死後も一定期間保護される。",
    "link": "https://ja.wikipedia.org/wiki/%E8%91%97%E4%BD%9C%E6%A8%A9"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "特許権",
    "definition": "新規性があり、進歩性を有する発明を保護する権利。特許庁に出願し審査を経て付与される。",
    "link": "https://ja.wikipedia.org/wiki/%E7%89%B9%E8%A8%B1%E6%A8%A9"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "商標権",
    "definition": "商品やサービスの名称、ロゴなどを保護する権利。他社の類似商品との混同を防ぎ、ブランドの識別力を保護する。",
    "link": "https://ja.wikipedia.org/wiki/%E5%95%86%E6%A8%99%E6%A8%A9"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "意匠権",
    "definition": "物品の美的外観（デザイン）を保護する権利。工業製品などの形状、模様、色彩などを含む。",
    "link": "https://ja.wikipedia.org/wiki/%E6%84%8F%E5%8C%A0%E6%A8%A9"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "肖像権",
    "definition": "個人の肖像（顔や姿）が、許可なく撮影されたり、公表されたりしないように保護される権利。プライバシー権の一部。",
    "link": "https://ja.wikipedia.org/wiki/%E8%82%96%E5%83%8F%E6%A8%A9"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "パブリシティ権",
    "definition": "有名人の肖像や氏名が持つ経済的価値を保護する権利。商業的に利用する際には本人の許諾が必要となる。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%91%E3%83%96%E3%83%AA%E3%82%B7%E3%83%86%E3%82%A3%E6%A8%A9"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "不正競争防止法",
    "definition": "事業者間の公正な競争を確保するための法律。営業秘密の侵害、商品の模倣、虚偽表示などを規制する。",
    "link": "https://ja.wikipedia.org/wiki/%E4%B8%8D%E6%AD%A3%E7%AB%B6%E4%BA%89%E9%98%B2%E6%AD%A2%E6%B3%95"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "営業秘密",
    "definition": "企業が保有する、秘密として管理され、事業活動に有用な技術上または営業上の情報。不正に取得・利用された場合に保護される。",
    "link": "https://ja.wikipedia.org/wiki/%E5%96%B6%E6%A5%AD%E7%A7%98%E5%AF%86"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "限定提供データ",
    "definition": "特定の者にのみ提供され、かつ秘密として管理されている技術上または営業上のデータ。不正競争防止法で保護される対象となる場合がある。",
    "link": "https://www.meti.go.jp/policy/economy/chizai/chiteki/trade-secret/teikyo-data.html"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "著作権侵害",
    "definition": "著作権者の許諾なく、著作物を複製、公衆送信、翻案などを行う行為。民事上および刑事上の責任を問われる可能性がある。",
    "link": "https://ja.wikipedia.org/wiki/%E8%91%97%E4%BD%9C%E6%A8%A9%E4%BE%B5%E5%AE%B3"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "名誉棄損",
    "definition": "公然と事実を摘示し、人の名誉を傷つける行為。事実の真偽にかかわらず成立する可能性がある。",
    "link": "https://ja.wikipedia.org/wiki/%E5%90%8D%E8%AA%89%E6%AF%84%E6%90%8D"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "AI社会の基本理念",
    "definition": "人間がAIの便益を最大限に享受するために必要な変革が行われ、AIの恩恵を享受している、または、必要な時に直ちにAIを導入しその恩恵を得られる状態にある社会の基本的な考え方。",
    "link": "chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/pdf/20240419_1.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "人間中心のAI社会原則",
    "definition": "AIの利用が憲法及び国際的な規範の保障する基本的人権を侵さないという原則。",
    "link": "chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/pdf/20240419_1.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "人間の尊厳が尊重される社会 (Dignity)",
    "definition": "AIが人間の尊厳を損なうことなく、人間の価値や権利が尊重される社会。",
    "link": "chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/pdf/20240419_1.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "多様な背景を持つ人々が多様な幸せを追求できる社会 (Diversity & Inclusion)",
    "definition": "AIが多様な人々のニーズに応え、包摂的な社会の実現に貢献する社会。",
    "link": "https://www.jpc-net.jp/consulting/report/detail/dei.html"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "持続性ある社会 (Sustainability)",
    "definition": "AIの利用が、環境、社会、経済の観点から持続可能である社会。",
    "link": "https://www.soumu.go.jp/main_content/000570778.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "AI社会原則",
    "definition": "「AI-Readyな社会」において、国や自治体をはじめとする我が国社会全体、さらには多国間の枠組みで実現されるべき社会的枠組みに関する原則。",
    "link": "https://www.soumu.go.jp/main_content/000570778.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "人間中心の原則",
    "definition": "AIの利用は、憲法及び国際的な規範の保障する基本的人権を侵すものであってはならないという原則。",
    "link": "https://www.soumu.go.jp/main_content/000570778.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "教育・リテラシーの原則",
    "definition": "AIに関する知識やスキルを普及させ、社会全体のリテラシーを高めることの重要性を示す原則。",
    "link": "https://www.soumu.go.jp/main_content/000570778.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "プライバシー確保の原則",
    "definition": "AIシステムの開発・利用において、個人のプライバシーが適切に保護されるべきであるという原則。",
    "link": "https://www.soumu.go.jp/main_content/000570778.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "セキュリティ確保の原則",
    "definition": "AIシステムの安全性と信頼性を確保し、サイバー攻撃や誤動作から保護されるべきであるという原則。",
    "link": "https://www.soumu.go.jp/main_content/000570778.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "公正競争確保の原則",
    "definition": "AI分野において、新たなビジネスやサービスが創出され、持続的な経済成長が維持されるよう、公正な競争環境が維持されなければならないという原則。",
    "link": "https://www.soumu.go.jp/main_content/000570778.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "公平・説明責任及び透明性の原則",
    "definition": "AIシステムが公平に機能し、その決定過程が説明可能であり、透明性が確保されるべきであるという原則。",
    "link": "https://www.soumu.go.jp/main_content/000570778.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "イノベーションの原則",
    "definition": "AI技術の研究開発と社会実装を促進し、新たな価値創造と社会課題解決に貢献すべきであるという原則。",
    "link": "https://www.soumu.go.jp/main_content/000570778.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "AI利活用原則の基本理念",
    "definition": "AIの恩恵を最大限に享受しつつ、AIがもたらすリスクを適切に管理するための基本的な考え方。",
    "link": "https://www8.cao.go.jp/cstp/tyousakai/humanai/4kai/siryo1.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "AIネットワーク",
    "definition": "AIシステムが相互に連携し、協調して機能するシステムの集合体。",
    "link": "https://www.soumu.go.jp/main_content/000570778.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "AI利活用原則(10の原則)",
    "definition": "内閣府が策定したAIの利用に関する基本的な原則。人間中心、プライバシー、セキュリティ、公平性、透明性、説明責任、イノベーションなどを柱とする。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "適正利用の原則",
    "definition": "AIシステムが意図された目的の範囲内で、倫理的かつ法的に問題のない形で利用されるべきであるという原則。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "適正学習の原則",
    "definition": "AIモデルの学習に用いられるデータが、偏りなく、適切に収集・処理されるべきであるという原則。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "連携の原則",
    "definition": "AIシステムや関連する主体（開発者、提供者、利用者）が相互に協力し、情報共有を行うことで、AIの安全性と信頼性を高めるという原則。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "安全の原則",
    "definition": "AIシステムが、人間に危害を加えたり、社会に混乱をもたらしたりしないよう、安全性に最大限配慮して設計・運用されるべきであるという原則。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "セキュリティの原則",
    "definition": "AIシステムがサイバー攻撃や不正アクセスから保護され、データの機密性、完全性、可用性が確保されるべきであるという原則。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "プライバシーの原則",
    "definition": "AIシステムの開発・利用において、個人のプライバシー権が尊重され、個人情報が適切に管理されるべきであるという原則。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "尊厳・自律の原則",
    "definition": "AIが人間の尊厳を尊重し、人間の自律的な意思決定を支援する形で利用されるべきであるという原則。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "公平性の原則",
    "definition": "AIシステムが特定の個人やグループに対して不当な差別や偏見を生じさせず、公正な判断を下すべきであるという原則。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "透明性の原則",
    "definition": "AIシステムの機能、目的、限界、そして意思決定プロセスが、関係者にとって理解可能で、開示されるべきであるという原則。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "アカウンタビリティの原則",
    "definition": "AIシステムによって生じた結果に対して、責任の所在が明確であり、その説明責任が果たされるべきであるという原則。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "AIガバナンスの構築",
    "definition": "AIの利活用によって生じるリスクをステークホルダーにとって受容可能な水準で管理しつつ、そこからもたらされる正のインパクトを最大化することを目的とする、ステークホルダーによる技術的、組織的、及び社会的システムの設計及び運用。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "AI開発者",
    "definition": "AIシステムを開発する事業者（AIを研究開発する事業者を含む）。AIモデル・アルゴリズムの開発、データ収集、学習、検証を通してAIシステムを構築する役割を担う。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "AI提供者",
    "definition": "開発されたAIシステムに付加価値を加えて、AI利用者にシステムやサービスを提供する事業者。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "AI利用者",
    "definition": "事業活動において、AIシステム又はAIサービスを利用する事業者。AI提供者が意図している適正な利用を行い、環境変化等の情報をAI提供者と共有し正常稼働を継続すること又は必要に応じて提供されたAIシステムを運用する役割を担う。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "LM (Language Model:言語モデル)",
    "definition": "単語の並びの確率をモデル化し、自然言語の文法や意味を理解・生成するAIモデル。次の単語の予測などに使われる。",
    "link": "https://ja.wikipedia.org/wiki/%E8%A8%80%E8%AA%9E%E3%83%A2%E3%83%87%E3%83%AB"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "n-gramモデル",
    "definition": "言語モデルの一種で、ある単語が出現する確率を、その直前のn-1個の単語の並び（n-gram）に基づいて予測する統計的なモデル。",
    "link": "https://ja.wikipedia.org/wiki/N%E3%82%B0%E3%83%A9%E3%83%A0"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "ニューラル言語モデル",
    "definition": "ニューラルネットワークを用いて言語のパターンを学習し、単語の確率を予測する言語モデル。n-gramモデルよりも文脈の理解度が高い。",
    "link": "https://ledge.ai/neural-language-model/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "LLM (Large Language Model:大規模言語モデル)",
    "definition": "Transformerアーキテクチャを基盤とし、大量のテキストデータで事前学習された、膨大な数のパラメータを持つ言語モデル。ChatGPTなどが該当する。",
    "link": "https://ja.wikipedia.org/wiki/%E5%A4%A7%E8%A6%8F%E6%A8%A1%E8%A8%80%E8%AA%9E%E3%83%A2%E3%83%87%E3%83%AB"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "プレトレーニング",
    "definition": "LLMにおいて、大量の汎用的なテキストデータを用いてモデルを事前に学習させるプロセス。これにより、モデルは言語の基本的な構造や知識を獲得する。",
    "link": "https://ledge.ai/pretraining/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "ハイパーパラメータ",
    "definition": "機械学習モデルの学習プロセスを制御するために、学習前に手動で設定されるパラメータ。学習率、バッチサイズ、エポック数などが該当する。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%8F%E3%82%A4%E3%83%91%E3%83%BC%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "Temperature",
    "definition": "LLMの生成において、出力のランダム性や多様性を調整するハイパーパラメータ。値が高いほど多様な出力になり、低いほど安定した出力になる。",
    "link": "https://ledge.ai/temperature/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "Top-p",
    "definition": "LLMの生成において、次に出現する単語の候補を確率が高いものから順に選び、累積確率がPを超えるまで選択するサンプリング手法。出力の多様性を制御する。",
    "link": "https://ledge.ai/top-p/"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "プロンプト",
    "definition": "AIモデル、特にLLMに対する入力指示。質問、命令、テキストの断片など、AIに特定の回答を引き出すために与える入力のこと。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AD%E3%83%B3%E3%83%97%E3%83%88%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%83%AA%E3%83%B3%E3%82%B0"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "プロンプトエンジニアリング",
    "definition": "AIモデルから望ましい出力を得るために、効果的なプロンプト（指示）を設計・最適化する技術や手法。",
    "link": "https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AD%E3%83%B3%E3%83%97%E3%83%88%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%83%AA%E3%83%B3%E3%82%B0"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "Instruction",
    "definition": "プロンプトにおいて、AIに何をすべきかを具体的に伝える指示。例：「〇〇について説明してください」",
    "link": "https://www.promptingguide.ai/jp/basics/elements"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "Context",
    "definition": "プロンプトにおいて、AIに出力を生成する上で考慮すべき背景情報や状況。これにより、AIはより適切で関連性の高い応答を生成できる。",
    "link": "https://www.promptingguide.ai/jp/basics/elements"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "Input Data",
    "definition": "プロンプトにおいて、AIが処理または参照すべき具体的なデータ。例：要約させたい文章、質問対象のデータ。",
    "link": "https://www.promptingguide.ai/jp/basics/elements"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "Output Indicator",
    "definition": "プロンプトにおいて、AIに期待する出力形式や内容を示すヒントや指示。例：「箇条書きで回答してください」「〇〇という形式で出力」",
    "link": "https://www.promptingguide.ai/jp/basics/elements"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "Zero-Shot プロンプティング",
    "definition": "AIモデルに事前の例示なしに、直接タスクの指示のみを与えて出力を生成させる手法。モデルの汎化能力を試す。",
    "link": "https://www.promptingguide.ai/jp/techniques/zeroshot"
  },
  {
    "chapter": "第4章 情報リテラシー・基本理念とAI社会原則",
    "term": "Few-Shot プロンプティング",
    "definition": "AIモデルに、タスクの指示とともに少数の入出力例を示すことで、そのタスクを学習させ、出力を生成させる手法。",
    "link": "https://www.promptingguide.ai/jp/techniques/fewshot"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "AI倫理",
    "definition": "人工知能の設計、開発、利用、運用において考慮すべき倫理的な原則や価値観。公平性、透明性、説明責任、プライバシー、安全性などが含まれる。",
    "link": "https://ja.wikipedia.org/wiki/AI%E5%80%AB%E7%90%86"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "AI法（EU AI Act）",
    "definition": "欧州連合（EU）が提案している、人工知能に関する包括的な規制法案。AIシステムをリスクレベルに応じて分類し、高リスクAIに厳しい規制を課すことを目指している。",
    "link": "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "高リスクAI",
    "definition": "人々の安全や基本的な権利に重大な影響を与える可能性のあるAIシステム。EU AI Actでは、医療、教育、法執行などの分野で利用されるAIがこれに分類される。",
    "link": "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "アルゴリズムバイアス",
    "definition": "AIが学習するデータに偏りがあることや、アルゴリズムの設計上の問題により、特定の個人やグループに対して不公平な判断や差別的な結果を生み出す現象。",
    "link": "https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0%E3%83%90%E3%82%A4%E3%82%A2%E3%82%B9"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "説明可能性（Explainable AI, XAI）",
    "definition": "AIの意思決定プロセスや出力結果が、人間にとって理解可能であるように設計・説明できること。AIの透明性と信頼性を高める上で重要となる。",
    "link": "https://ja.wikipedia.org/wiki/%E8%AA%AC%E6%98%8E%E5%8F%AF%E8%83%BD%E3%81%AAAI"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "AIの悪用",
    "definition": "AI技術が、プライバシー侵害、監視、偽情報拡散、自律型兵器など、社会に危害をもたらす目的で利用されること。",
    "link": "https://www.soumu.go.jp/main_content/000845949.pdf"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "雇用への影響",
    "definition": "AI技術の導入により、特定の職種が自動化され、雇用の創出と喪失の両方が発生すること。スキルの再教育や新たな職種の創出が課題となる。",
    "link": "https://www.meti.go.jp/shingikai/economy/sangyo_kozo/pdf/005_02_00.pdf"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "社会格差",
    "definition": "AI技術の恩恵を受けることができる者とそうでない者の間で、経済的、情報的な格差が拡大する可能性。",
    "link": "https://www.soumu.go.jp/johotsusintokei/whitepaper/ja/r05/html/nd234120.html"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "知的財産権とAI",
    "definition": "AIが生成したコンテンツの著作権帰属や、AI学習における既存著作物の利用に関する法的・倫理的な問題。各国で議論が進められている。",
    "link": "https://www.jpo.go.jp/system/laws/rule/chizai/ai-chizai.html"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "責任の所在",
    "definition": "AIシステムが誤動作したり、損害を引き起こしたりした場合に、誰がその責任を負うべきかという問題。開発者、提供者、利用者など複数の関係者が存在するため複雑化する。",
    "link": "https://www.meti.go.jp/policy/it_policy/ai/gikai/ai_governance_philosophy.pdf"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "AIの環境負荷",
    "definition": "AIモデルの学習や運用に必要な計算資源が膨大であり、それによって発生する電力消費や二酸化炭素排出などの環境への影響。",
    "link": "https://ledge.ai/ai-and-environment/"
  },
  {
    "chapter": "第5章 AI倫理と法規制、社会への影響",
    "term": "社会実装",
    "definition": "研究開発されたAI技術を、実際の社会や産業に導入し、広く利用されるようにすること。",
    "link": "https://ledge.ai/ai-social-implementation/"
  }
];

let currentWords = [...words]; // 現在表示対象の単語リスト

// 章プルダウンを生成する
function populateChapters() {
    const chapters = ['すべての章', ...new Set(words.map(word => word.chapter))];
    chapterSelect.innerHTML = '';
    chapters.forEach(chapter => {
        const option = document.createElement('option');
        option.value = chapter;
        option.textContent = chapter;
        chapterSelect.appendChild(option);
    });
}

// 単語を表示する
function showWord(word) {
    if (!word) return;
    termEl.textContent = word.term;
    definitionEl.textContent = word.definition;
    linkEl.href = word.link;
    chapterEl.textContent = word.chapter;
    flashcard.classList.remove('flipped');
}

// 次の単語を表示する
function showNextWord() {
    if (currentWords.length === 0) return;
    currentIndex = (currentIndex + 1) % currentWords.length;
    showWord(currentWords[currentIndex]);
}

// 前の単語を表示する
function showPrevWord() {
    if (currentWords.length === 0) return;
    currentIndex = (currentIndex - 1 + currentWords.length) % currentWords.length;
    showWord(currentWords[currentIndex]);
}

// ランダムな単語を表示する
function showRandomWord() {
    if (currentWords.length === 0) {
        termEl.textContent = '該当する単語がありません';
        definitionEl.textContent = '';
        linkEl.href = '#';
        chapterEl.textContent = '';
        return;
    }
    currentIndex = Math.floor(Math.random() * currentWords.length);
    showWord(currentWords[currentIndex]);
}

// 章が変更されたときの処理
chapterSelect.addEventListener('change', function() {
    const selectedChapter = this.value;
    if (selectedChapter === 'すべての章') {
        currentWords = [...words];
    } else {
        currentWords = words.filter(word => word.chapter === selectedChapter);
    }
    showRandomWord();
});

// オートコンプリートのロジック
searchInput.addEventListener('input', function() {
    const inputValue = this.value;
    autocompleteList.innerHTML = '';
    if (!inputValue) return;

    const suggestions = currentWords.filter(word => 
        word.term.toLowerCase().includes(inputValue.toLowerCase())
    );

    suggestions.forEach(suggestedWord => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.innerHTML = suggestedWord.term;
        suggestionDiv.addEventListener('click', function() {
            showWord(suggestedWord);
            currentIndex = currentWords.findIndex(word => word.term === suggestedWord.term && word.chapter === suggestedWord.chapter);
            searchInput.value = '';
            autocompleteList.innerHTML = '';
        });
        autocompleteList.appendChild(suggestionDiv);
    });
});

// 他の場所をクリックしたら候補を閉じる
document.addEventListener('click', function (e) {
    if (e.target !== searchInput) {
        autocompleteList.innerHTML = '';
    }
});

// カードをクリックしたときの処理
flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
});

// ランダム表示ボタンをクリックしたときの処理
randomBtn.addEventListener('click', showRandomWord);

// スワイプ処理
function handleSwipe() {
    const swipeThreshold = 50; // スワイプと判定する最小距離
    if (touchStartX - touchEndX > swipeThreshold) {
        showNextWord(); // 左スワイプ
    } else if (touchEndX - touchStartX > swipeThreshold) {
        showPrevWord(); // 右スワイプ
    }
}

flashcardContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

flashcardContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// キーボード操作
document.addEventListener('keydown', (e) => {
    if (e.target === searchInput) return; // 検索入力中は無効

    if (e.key === 'ArrowLeft') {
        showPrevWord();
    } else if (e.key === 'ArrowRight') {
        showNextWord();
    } else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault(); // スペースキーでのスクロールを防止
        flashcard.classList.toggle('flipped');
    }
});

// 初期表示
populateChapters();
showRandomWord();