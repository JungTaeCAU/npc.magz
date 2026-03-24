"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, RefreshCw } from "lucide-react";

// 문항 데이터 (패션으로 까보는 본캐)
const questions = [
  {
    id: 1,
    category: "01. 스타일 정체성",
    title: "평생 한 가지 스타일만 입어야 한다면?",
    options: [
      { type: "A", text: "\"편한 게 GOAT\" → 스트릿 / 트레이닝 깔" },
      { type: "B", text: "\"사람은 단정이 기본\" → 셔츠+수트 국밥코어" },
      { type: "C", text: "\"꾸민 듯 안 꾸민 듯\" → 꾸안꾸 장인 모드" },
      { type: "D", text: "\"남들이랑 겹치면 죽음\" → 빈티지 / 개성 MAX" },
    ],
  },
  {
    id: 2,
    category: "02. 쇼핑 기준",
    title: "쇼핑할 때 기준 뭐에요? 솔직히!",
    options: [
      { type: "A", text: "핏이 인생이다 (거울 ON)" },
      { type: "B", text: "소재=인생. 오래 입어야지" },
      { type: "C", text: "가성비 or die" },
      { type: "D", text: "브랜드 철학까지 먹고 삼" },
    ],
  },
  {
    id: 3,
    category: "03. 첫인상 포인트",
    title: "남 처음 볼 때 어디부터 보세요?",
    options: [
      { type: "A", text: "신발 (이 사람 감 있네)" },
      { type: "B", text: "액세서리 (디테일)" },
      { type: "C", text: "상의 핏 / 컬러 (깔끔력)" },
      { type: "D", text: "가방 / 소품 (숨겨진 변태력(?))" },
    ],
  },
  {
    id: 4,
    category: "04. 약속 전날 루틴",
    title: "중요한 약속 전날 루틴",
    options: [
      { type: "A", text: "풀착장 리허설 (거의 광기)" },
      { type: "B", text: "머릿속 코디 시뮬 돌림" },
      { type: "C", text: "당일 감으로 간다 (컨디션 맞춰서)" },
      { type: "D", text: "걍 필승템 꺼냄 (국밥조합)" },
    ],
  },
  {
    id: 5,
    category: "05. 퍼스널 컬러",
    title: "내 퍼스널 컬러는?",
    options: [
      { type: "A", text: "무채색 (신뢰감코어)" },
      { type: "B", text: "따뜻한 색 (인간 햇살 모드)" },
      { type: "C", text: "차가운 색 (지능캐 vibes)" },
      { type: "D", text: "비비드 (나 여기 있다!!!!)" },
    ],
  },
  {
    id: 6,
    category: "06. 옷장 위기 대처",
    title: "옷 많은데 입을 거 없을 때",
    options: [
      { type: "A", text: "쇼핑 ON (현실도피)" },
      { type: "B", text: "옷장 리셋 (미니멀 코어)" },
      { type: "C", text: "조합 뇌지컬 풀가동" },
      { type: "D", text: "걍 손 가는 거 입고 ㄱㄱ" },
    ],
  },
];

// 결과 타입별 상세 정보 (점수 기반: 6~12 / 13~18 / 19~24)
const resultTypes = [
  {
    range: [6, 12],
    title: "원칙코어 인간 / 클래식 본캐",
    subtitle: "CLASSIC CORE",
    description:
      "유행? 필요 없음. 기준 확실하고 자기 방식 있음. 조용한데 쎔.",
    color: "#2C3E50",
    traits: ["원칙", "클래식", "신뢰감", "묵직함"],
  },
  {
    range: [13, 18],
    title: "밸런스 미친 센스캐",
    subtitle: "BALANCE GOAT",
    description:
      "상황 맞춰서 스타일 바뀜. 눈치 + 센스 둘 다 있음. 어디 가도 안 어색한 인간 GOAT.",
    color: "#E67E22",
    traits: ["센스", "밸런스", "적응력", "눈치"],
  },
  {
    range: [19, 24],
    title: "개성에 미친 자유영혼",
    subtitle: "FREE SPIRIT",
    description:
      "틀? 그런 거 없음. 걍 자기 하고 싶은 거 함. 같이 있으면 감 살아남.",
    color: "#E74C3C",
    traits: ["개성", "자유", "창의성", "에너지"],
  },
];

export default function FashionSurvey() {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
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
    const scoreMap: Record<string, number> = { A: 1, B: 2, C: 3, D: 4 };
    const point = scoreMap[type] ?? 1;

    setTimeout(() => {
      setTotalScore((prev) => prev + point);

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
    setTotalScore(0);
    setCurrentStep(0);
    setIsFinished(false);
    setSelectedOption(null);
    setShowPrizeForm(false);
    setPrizeForm({ name: "", phone: "" });
    setIsSubmitted(false);
  };

  // 결과 화면
  if (isFinished) {
    const result =
      resultTypes.find(
        (r) => totalScore >= r.range[0] && totalScore <= r.range[1]
      ) ?? resultTypes[1];

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
            <p className="text-sm main-font text-cream/60 mb-2">
              총점 {totalScore}점 / 24점
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
          <div className="flex items-center">
            <img src="/image/logo.png" alt="npc.magz" className="h-6 md:h-8 w-auto" />
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
