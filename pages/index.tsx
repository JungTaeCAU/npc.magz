"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, RefreshCw } from "lucide-react";

// 문항 데이터 (패션 심리학 기반)
const questions = [
  {
    id: 1,
    category: "01. 일상의 통제력",
    title: "오늘 외출 준비 중 옷을 고를 때, 당신의 평소 루틴은?",
    options: [
      {
        type: "A",
        text: "일기예보와 스케줄을 고려해 전날 밤 완벽하게 세팅해 둔다.",
      },
      {
        type: "B",
        text: "가장 편안한 나만의 '교복템' 라인업을 고민 없이 입는다.",
      },
      {
        type: "C",
        text: "그날 아침의 기분이나 유독 꽂히는 컬러에 따라 즉흥적으로 고른다.",
      },
      {
        type: "D",
        text: "수없이 입고 벗기를 반복하다, 결국 가장 무난한 옷을 고른다.",
      },
    ],
  },
  {
    id: 2,
    category: "02. 스트레스 대처",
    title: "유난히 우울하고 스트레스 받은 날, 기분 전환을 위한 패션은?",
    options: [
      {
        type: "A",
        text: "쨍한 원색 컬러나 반짝이는 화려한 액세서리로 포인트 주기",
      },
      {
        type: "B",
        text: "시선을 차단하는 모자나 포근하게 몸을 감싸는 오버핏 소재 입기",
      },
      {
        type: "C",
        text: "긴장감과 자신감을 부여하는 각 잡힌 세련된 '파워 수트' 입기",
      },
      {
        type: "D",
        text: "옷을 입는 대신 무작정 쇼핑 앱 장바구니를 채우며 결제하기",
      },
    ],
  },
  {
    id: 3,
    category: "03. 사회적 페르소나",
    title: "새로운 네트워킹 모임 첫날, 사람들에게 보여주고 싶은 내 이미지는?",
    options: [
      {
        type: "A",
        text: "군더더기 없이 세련되고 지적인 신뢰감을 주는 사람",
      },
      {
        type: "B",
        text: "상냥하고 부드러운 인상으로 다가가기 편안하고 다정한 사람",
      },
      {
        type: "C",
        text: "남들 시선에 얽매이지 않는, 나만의 확고하고 독특한 개성을 가진 사람",
      },
      {
        type: "D",
        text: "격식보다 활기차고 에너지가 넘치는 쿨한 성격을 가진 사람",
      },
    ],
  },
  {
    id: 4,
    category: "04. 소비 패턴",
    title: "조건 없는 보너스 50만 원이 생겼습니다. 당신의 지출 방식은?",
    options: [
      {
        type: "A",
        text: "돈을 보태서라도 누구나 알아보는 명품 핵심 아이템 하나 구매하기",
      },
      {
        type: "B",
        text: "합리적인 '듀프(대체품)' 브랜드를 사고 남은 돈은 여행 등 경험에 쓰기",
      },
      {
        type: "C",
        text: "유행 타지 않는 질 좋은 무채색 기본템을 여러 벌 구비해 활용하기",
      },
      {
        type: "D",
        text: "친환경 소재나 스토리가 명확한 빈티지를 찾아 가치 소비 실천하기",
      },
    ],
  },
  {
    id: 5,
    category: "05. 커리어 가치관",
    title: "매일 출근해야 하는 새로운 조직, 당신이 바라는 이상적인 모습은?",
    options: [
      {
        type: "A",
        text: "복장 규정은 엄격하지만, 고용과 연봉이 평생 보장되는 안정적인 곳",
      },
      {
        type: "B",
        text: "복장 제약이 전혀 없고, 업무 내용이 내 적성에 완벽하게 맞는 곳",
      },
      {
        type: "C",
        text: "뭘 입든 서로 관심 없고, 퇴근 후 개인의 워라밸이 철저히 보장되는 곳",
      },
      {
        type: "D",
        text: "모두가 선망하는 멋진 사원증을 걸고, 장래에 큰 성취를 이룰 수 있는 곳",
      },
    ],
  },
  {
    id: 6,
    category: "06. 자기 수용",
    title: "옷을 입을 때 체형이나 외모의 콤플렉스를 대하는 당신의 태도는?",
    options: [
      {
        type: "A",
        text: "단점을 완벽하게 커버하고 가릴 수 있는 세밀한 디자인을 찾는다.",
      },
      {
        type: "B",
        text: "가리기보다 내가 가진 장점을 화려하게 부각해 시선을 분산시킨다.",
      },
      {
        type: "C",
        text: "내 몸이 어떻든 남들 기준 신경 쓰지 않고 당당하게 내 스타일을 입는다.",
      },
      {
        type: "D",
        text: "소셜 미디어에서 유행하는 신개념 체형 보정 아이템을 트렌디하게 활용한다.",
      },
    ],
  },
];

// 결과 타입별 상세 정보
const resultTypes = {
  A: {
    title: "완벽주의 철벽 셋업형",
    subtitle: "PERFECTIONIST",
    description:
      "상황을 통제하려는 욕구가 강하고 사회적 인정과 신뢰감을 중시합니다. 리스크를 회피하고 완벽하게 세팅된 안정감 속에서 본인의 능력을 100% 발휘하는 타입이군요!",
    color: "#2C3E50",
    traits: ["완벽주의", "계획성", "신뢰성", "품격"],
  },
  B: {
    title: "실용주의 코지(Cozy)형",
    subtitle: "MINIMALIST",
    description:
      "불필요한 인지적 과부하를 줄이고 효율성을 극대화하는 현명한 소비자! 타인과의 공감과 정서적 교감을 중시하며, 실질적인 가치와 편안함을 가장 중요하게 생각합니다.",
    color: "#7F8C8D",
    traits: ["실용성", "편안함", "지속가능성", "효율성"],
  },
  C: {
    title: "마이웨이 도파민 드레서",
    subtitle: "CREATIVE",
    description:
      "남들의 시선보다는 나만의 오리지널리티와 자아실현이 가장 중요합니다! 높은 자존감과 자기애를 바탕으로 직관적이고 예술적인 에너지를 뿜어내는 자유로운 영혼입니다.",
    color: "#E74C3C",
    traits: ["창의성", "개성", "감성", "자유로움"],
  },
  D: {
    title: "트렌드-어댑터 야망캐",
    subtitle: "TRENDSETTER",
    description:
      "외부의 유행과 솔루션을 적극적으로 수용하여 문제를 해결하는 얼리어답터! 커리어에서의 성취 욕구와 활동성이 높으며 힙한 트렌드를 누구보다 쿨하게 소화해냅니다.",
    color: "#9B59B6",
    traits: ["트렌드", "야망", "성취", "리더십"],
  },
};

export default function FashionSurvey() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showPrizeForm, setShowPrizeForm] = useState(false);
  const [prizeForm, setPrizeForm] = useState({
    name: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (type: string) => {
    setSelectedOption(type);

    // 선택 애니메이션 후 다음 단계로
    setTimeout(() => {
      setScores((prev) => ({
        ...prev,
        [type]: prev[type as keyof typeof prev] + 1,
      }));

      if (currentStep < questions.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
      }
    }, 600);
  };

  const handlePrizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prizeForm.name.trim() && prizeForm.phone.trim()) {
      // 여기서 실제로는 서버에 데이터를 전송할 수 있습니다
      console.log("Prize form submitted:", prizeForm);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setScores({ A: 0, B: 0, C: 0, D: 0 });
    setCurrentStep(0);
    setIsFinished(false);
    setSelectedOption(null);
    setShowPrizeForm(false);
    setPrizeForm({ name: "", phone: "" });
    setIsSubmitted(false);
  };

  // 결과 화면
  if (isFinished) {
    const finalType = Object.keys(scores).reduce((a, b) =>
      scores[a as keyof typeof scores] > scores[b as keyof typeof scores]
        ? a
        : b,
    ) as keyof typeof resultTypes;

    const result = resultTypes[finalType];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-charcoal text-cream flex flex-col items-center justify-center p-6 relative overflow-hidden"
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-cream rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-cream rotate-12"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 border border-cream -rotate-12"></div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center z-10"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="mb-8"
          >
            <Sparkles className="w-8 h-8 mx-auto mb-4 text-pink animate-bounce-soft" />
            <p className="main-font text-pink mb-2 text-lg">
              ✨ 당신의 패션 퍼스널리티 ✨
            </p>
            <h1
              className="main-font font-bold text-4xl md:text-6xl mb-4"
              style={{ color: result.color }}
            >
              {result.title}
            </h1>
            <p className="text-xl md:text-2xl main-font font-medium mb-8 text-cream/90">
              {result.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-lg mx-auto mb-12"
          >
            <p className="text-lg leading-relaxed text-cream/90 mb-8">
              {result.description}
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {result.traits.map((trait, index) => (
                <motion.span
                  key={trait}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="px-4 py-2 bg-cream/10 border border-cream/20 text-sm font-medium tracking-wide"
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* 경품 추첨 폼 */}
          {!isSubmitted && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="max-w-md mx-auto mb-8"
            >
              {!showPrizeForm ? (
                <motion.div
                  className="text-center p-6 bg-gradient-to-r from-pink/10 to-accent/10 rounded-2xl border border-pink/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="mb-4">
                    <span className="text-3xl mb-2 block">🎁</span>
                    <h3 className="main-font font-bold text-xl text-white mb-2">
                      경품 추첨 이벤트
                    </h3>
                    <p className="text-sm text-white/80 main-font">
                      정보를 입력하고 특별한 혜택을 받아보세요!
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setShowPrizeForm(true)}
                    className="bg-gradient-to-r from-pink to-accent text-white px-6 py-3 rounded-full main-font font-medium hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    참여하기 ✨
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onSubmit={handlePrizeSubmit}
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-charcoal/10 shadow-xl"
                >
                  <div className="text-center mb-6">
                    <span className="text-2xl mb-2 block">🎁</span>
                    <h3 className="main-font font-bold text-lg text-charcoal mb-1">
                      경품 추첨 참여
                    </h3>
                    <p className="text-xs text-charcoal/60 main-font">
                      정보 입력 후 추첨에 참여하세요
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="이름을 입력해주세요"
                        value={prizeForm.name}
                        onChange={(e) =>
                          setPrizeForm({ ...prizeForm, name: e.target.value })
                        }
                        className="w-full p-3 border border-charcoal/20 rounded-lg main-font text-sm text-charcoal placeholder-charcoal/50 focus:border-pink focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="휴대폰 번호를 입력해주세요"
                        value={prizeForm.phone}
                        onChange={(e) =>
                          setPrizeForm({ ...prizeForm, phone: e.target.value })
                        }
                        className="w-full p-3 border border-charcoal/20 rounded-lg main-font text-sm text-charcoal placeholder-charcoal/50 focus:border-pink focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <motion.button
                      type="button"
                      onClick={() => setShowPrizeForm(false)}
                      className="flex-1 py-3 border border-charcoal/20 rounded-lg main-font text-sm text-charcoal/70 hover:bg-charcoal/5 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      취소
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-pink to-accent text-white rounded-lg main-font text-sm font-medium hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      참여하기
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </motion.div>
          )}

          {/* 제출 완료 메시지 */}
          {isSubmitted && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md mx-auto mb-8 text-center p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl border border-green-200"
            >
              <span className="text-3xl mb-3 block">🎉</span>
              <h3 className="main-font font-bold text-lg text-charcoal mb-2">
                참여 완료!
              </h3>
              <p className="text-sm text-charcoal/70 main-font">
                경품 추첨에 참여해주셔서 감사합니다.
                <br />
                결과는 개별 연락드릴 예정입니다.
              </p>
            </motion.div>
          )}

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleReset}
            className="luxury-button group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4 inline mr-2 group-hover:rotate-180 transition-transform duration-300" />
            다시 테스트하기
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const currentQ = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-cream text-charcoal relative overflow-hidden">
      {/* 배경 그래픽 요소 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64 border border-charcoal rotate-45"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-charcoal -rotate-12"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 헤더 */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center p-6 md:p-8 border-b border-charcoal/20"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink to-accent rounded-full flex items-center justify-center animate-bounce-soft">
              <span className="text-white text-sm font-bold"></span>
            </div>
            <div className="py-1">
              <h1 className="brand-title text-charcoal bg-gradient-to-r from-pink to-accent bg-clip-text text-transparent">
                npc.magz
              </h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium main-font text-charcoal">
              {currentStep + 1} / {questions.length} 🌟
            </p>
            <div className="w-16 h-2 bg-lavender/50 rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="max-w-2xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* 카테고리 */}
                <motion.div
                  className="flex items-center space-x-2 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-2xl">💫</span>
                  <p className="main-font font-semibold text-pink text-lg">
                    {currentQ.category}
                  </p>
                </motion.div>

                {/* 질문 */}
                <motion.h2
                  className="main-font font-bold text-2xl md:text-3xl mb-12 whitespace-pre-line leading-relaxed text-charcoal"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentQ.title}
                </motion.h2>

                {/* 선택지 */}
                <div className="space-y-4">
                  {currentQ.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      onClick={() => handleSelect(option.type)}
                      disabled={selectedOption !== null}
                      className={`option-card group w-full text-left ${
                        selectedOption === option.type
                          ? "border-accent bg-accent/5 scale-105"
                          : "hover:border-charcoal/40"
                      } ${selectedOption && selectedOption !== option.type ? "opacity-50" : ""}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <span className="block text-base md:text-lg font-medium leading-relaxed main-font">
                            {option.text}
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 ml-4 mt-1 transition-all duration-300 ${
                            selectedOption === option.type
                              ? "text-accent rotate-90"
                              : "text-charcoal/40 group-hover:text-charcoal"
                          }`}
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* 푸터 */}
        <motion.footer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-6 md:p-8 text-center border-t border-charcoal/20"
        >
          <div className="flex items-center justify-center space-x-3">
            <img
              src="/image/instagram.png"
              alt="Instagram"
              className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            />
            <p className="text-sm text-charcoal/70 main-font font-medium">
              npc.magz
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
