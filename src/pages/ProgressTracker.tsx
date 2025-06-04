import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const MODULES = [
	{ id: "react", label: "React + TypeScript", lessons: 12 },
	{ id: "manual", label: "Manual Test", lessons: 8 },
	{ id: "automation", label: "Automation Test", lessons: 8 },
	{ id: "cert", label: "Chứng chỉ & luyện thi", lessons: 4 },
];

export default function ProgressTracker() {
	const [progress, setProgress] = useState<Record<string, number>>({});

	useEffect(() => {
		const fetchProgress = async () => {
			const snapshot = await getDocs(collection(db, "progress"));
			const data: Record<string, number> = {};
			snapshot.forEach((doc) => (data[doc.id] = doc.data().completed));
			setProgress(data);
		};
		fetchProgress();
	}, []);

	const updateProgress = async (id: string, increment: number) => {
		const current = progress[id] || 0;
		const module = MODULES.find((m) => m.id === id);
		const max = module?.lessons || 0;
		const updated = Math.min(Math.max(0, current + increment), max);
		await setDoc(doc(db, "progress", id), { completed: updated });
		setProgress({ ...progress, [id]: updated });
	};

	return (
		<div className="grid gap-6 p-6 md:grid-cols-2">
			{MODULES.map(({ id, label, lessons }) => {
				const completed = progress[id] || 0;
				const percent = Math.round((completed / lessons) * 100);
				return (
					<Card key={id}>
						<CardContent className="p-4 space-y-4">
							<h2 className="text-xl font-semibold">{label}</h2>
							<Progress value={percent} />
							<p>
								{completed} / {lessons} bài học
							</p>
							<div className="flex gap-2">
								<Button onClick={() => updateProgress(id, 1)}>
									Hoàn thành 1 bài
								</Button>
								{completed > 0 && (
									<Button
										variant="outline"
										onClick={() => updateProgress(id, -1)}
									>
										Hoàn tác
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
