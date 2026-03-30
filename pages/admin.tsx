"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, RefreshCw } from "lucide-react";

type Row = string[];

export default function AdminPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin");
      if (!res.ok) throw new Error("조회 실패");
      const data = await res.json();
      setRows(data.rows ?? []);
    } catch {
      setError("데이터를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (rowIndex: number) => {
    setDeletingIndex(rowIndex);
    setConfirmIndex(null);
    try {
      const res = await fetch("/api/delete-row", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rowIndex }),
      });
      if (!res.ok) throw new Error("삭제 실패");
      // 로컬 상태에서도 즉시 제거
      setRows((prev) => prev.filter((_, i) => i !== rowIndex));
    } catch {
      setError("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingIndex(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const headers = ["제출시간", "이름", "전화번호", "결과타입"];
  const dataRows =
    rows.length > 0 && rows[0][0] === "제출시간" ? rows.slice(1) : rows;
  // 헤더가 있는 경우 실제 시트 행 인덱스는 +1
  const hasHeader = rows.length > 0 && rows[0][0] === "제출시간";

  return (
    <div className="min-h-screen bg-charcoal text-cream p-6">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="brand-title text-white text-2xl">npc.magz</h1>
            <p className="text-cream/50 text-sm main-font mt-1">
              경품 추첨 참여자 목록
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-cream/60 text-sm main-font">
              총 {dataRows.length}명
            </span>
            <motion.button
              onClick={fetchData}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm main-font hover:bg-white/20 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              <span>{isLoading ? "로딩..." : "새로고침"}</span>
            </motion.button>
          </div>
        </div>

        {/* 에러 */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm main-font">
            {error}
          </div>
        )}

        {/* 테이블 */}
        {isLoading ? (
          <div className="text-center py-20 text-cream/40 main-font">
            불러오는 중...
          </div>
        ) : dataRows.length === 0 ? (
          <div className="text-center py-20 text-cream/40 main-font">
            아직 참여자가 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm main-font">
              <thead>
                <tr className="bg-white/10 border-b border-white/10">
                  <th className="text-left px-4 py-3 text-cream/60 font-medium w-8">
                    #
                  </th>
                  {headers.map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-cream/60 font-medium"
                    >
                      {h}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-cream/60 font-medium w-28">
                    삭제
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {dataRows.map((row, i) => {
                    const sheetRowIndex = hasHeader ? i + 1 : i;
                    const isDeleting = deletingIndex === sheetRowIndex;
                    const isConfirming = confirmIndex === i;

                    return (
                      <motion.tr
                        key={`${row[0]}-${i}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: isDeleting ? 0.4 : 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: i * 0.02 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-3 text-cream/30">{i + 1}</td>
                        {headers.map((_, j) => (
                          <td key={j} className="px-4 py-3 text-cream/90">
                            {row[j] ?? "-"}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center">
                          {isConfirming ? (
                            <div className="flex flex-row items-center gap-1">
                              <button
                                onClick={() => handleDelete(sheetRowIndex)}
                                disabled={isDeleting}
                                className="px-2 py-1 bg-red-500 text-white rounded text-xs main-font hover:bg-red-600 transition-colors disabled:opacity-50 whitespace-nowrap"
                              >
                                확인
                              </button>
                              <button
                                onClick={() => setConfirmIndex(null)}
                                className="px-2 py-1 bg-white/10 text-cream/60 rounded text-xs main-font hover:bg-white/20 transition-colors whitespace-nowrap"
                              >
                                취소
                              </button>
                            </div>
                          ) : (
                            <motion.button
                              onClick={() => setConfirmIndex(i)}
                              disabled={isDeleting}
                              className="p-1.5 text-cream/30 hover:text-red-400 transition-colors disabled:opacity-30"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
