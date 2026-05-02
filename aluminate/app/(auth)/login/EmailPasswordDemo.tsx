"use client";

import { User } from "@supabase/supabase-js";

type EmailPasswordDemoProps = {
  user: User | null;
};

export default function EmailPasswordDemo({ user }: EmailPasswordDemoProps) {
	return (
		<div>
			<h1>Email Password Demo</h1>
		</div>
	);
}